import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import { TextField } from "@mui/material";
import { getFiltersDataOfShopByPrice } from "../../rest/ApiService";

const data = {
  filter: [
    {
      title: "Availability",
      values: ["In Stock"],
    },
  ],
};
const Filters = ({ dataReceiveCallBack, itemList, price }) => {
  const [filterValues, setFilterValues] = useState([]);
  const [checked, setChecked] = useState(false);
  const [fromPrice, setFromPrice] = useState("");
  const [toPrice, setToPrice] = useState(price);

  useEffect(() => {
    setFilterValues(data.filter);
  }, []);

  useEffect(() => {
    if (!checked && !fromPrice && !toPrice) {
      if (itemList) {
        dataReceiveCallBack(itemList);
      }
    } else {
      getFiltersDataOfShopByPrice(checked, fromPrice, toPrice, (result) => {
        dataReceiveCallBack(result);
        console.log(result, "filteredData");
      });
    }
  }, [checked, fromPrice, toPrice]);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div>
      <h2 className="filters-heading">Filters</h2>
      {filterValues.map((values, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{values.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {values.values.map((keys, index) => (
              <div key={index}>
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <span>{keys}</span>
              </div>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Price</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="input-price-container">
            <div className="input-price">
              <span className="rupees">&#8377;</span>
              <TextField
                id="outlined-number"
                label="From"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setFromPrice(e.target.value)}
                value={fromPrice}
              />
            </div>
            <div className="input-price">
              <span className="rupees">&#8377;</span>
              <TextField
                id="outlined-number"
                label="To"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  let value = parseInt(e.target.value);
                  console.log(value, "VAULUR");

                  if (value <= 0 || value <= fromPrice || !isNaN(value)) {
                    value = price;
                  }
                  if (value > price) value = price;

                  setToPrice(value);
                }}
                value={toPrice}
              />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Filters;
