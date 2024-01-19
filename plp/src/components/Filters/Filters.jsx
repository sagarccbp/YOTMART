import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import { TextField } from "@mui/material";
import { getFiltersData, itemsOfSubCategory } from "../../rest/ApiService";

import "./filters.scss";

let min = 0;

const data = {
  filter: [
    {
      title: "Availability",
      values: ["In Stock"],
    },
  ],
};
const Filters = ({ dataReceiveCallBack, subCatId }) => {
  const [filterValues, setFilterValues] = useState([]);
  const [checked, setChecked] = useState(false);
  const [fromPrice, setFromPrice] = useState("");
  const [toPrice, setToPrice] = useState("");

  useEffect(() => {
    setFilterValues(data.filter);
  }, []);

  useEffect(() => {
    if (!checked && !fromPrice && !toPrice) {
      itemsOfSubCategory(subCatId, (result) => {
        dataReceiveCallBack(result.data);
      });
    } else {
      getFiltersData(checked, fromPrice, toPrice, subCatId, (result) => {
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
                onChange={(e) => {
                  var value = parseInt(e.target.value);

                  if (value < min) value = min;

                  setFromPrice(value);
                }}
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
                  var value = parseInt(e.target.value);

                  if (value < min) value = min;

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
