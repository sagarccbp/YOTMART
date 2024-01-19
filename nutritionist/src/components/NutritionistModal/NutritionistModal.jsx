import React, { useState, useEffect } from "react";

import {
  getDiseases,
  getForms,
  getFormsWithDisease,
  submitSingleForm,
} from "../../rest/ApiService";
import Multiselect from "multiselect-react-dropdown";
import { useNavigate } from "react-router-dom";
import Loader from "auth/Loader";
import "./nutritionnistModal.scss";

let arr = [];
let joinedString;
let i = 0;
let filtered = [];
const NutritionistModal = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState({});
  const [diseases, setDiseases] = useState([]);
  const [selectedDisease, setSelectedDisease] = useState();
  const [forms, setForms] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [showGetStart, setShowGetStart] = useState(true);
  const [showDietForm, setShowDietForm] = useState(false);
  const [selectedForm, setSelectedForm] = useState();
  const [formsWithDisease, setFormsWithDisease] = useState([]);
  const [questionsAnswers, setQuestionsAnswers] = useState([]);
  const [selectedCheckAnswer, setSelectedCheckAnswer] = useState({
    question: "",
    answer: "",
    formId: "",
  });
  const [error, setError] = useState(false);

  const handleTextChange = (e, question, type) => {
    const { value, checked } = e.target;
    if (type === "CHECK_BOX" && checked) {
      arr = [...arr, value];
    } else {
      arr = arr.filter((item) => item !== value);
    }

    // if (type === "RADIO_BUTTON") {
    //   setSelectedRadioAnswer((prevSelected) => ({
    //     ...prevSelected,
    //     [question.question]: option,
    //   }));
    // }

    joinedString = arr.join("|");

    setSelectedCheckAnswer((prevValues) => ({
      ...prevValues,
      answer: type === "CHECK_BOX" ? joinedString : value,
      question: question.question,
    }));
  };
  useEffect(() => {
    if (selectedCheckAnswer.question && selectedCheckAnswer.answer) {
      const newInputObject = {
        question: selectedCheckAnswer.question,
        answer: selectedCheckAnswer.answer,
      };

      setQuestionsAnswers((prevData) => [...prevData, newInputObject]);
    }
  }, [selectedCheckAnswer]);
  useEffect(() => {
    // console.log(selectedRadioAnswer, "RADIO");
    console.log(questionsAnswers, "BOX");
  }, [questionsAnswers]);

  useEffect(() => {
    setLoggedInUser(user);

    setLoading(false);
  }, []);

  useEffect(() => {
    getDiseases((result) => {
      setDiseases(result.data);
    });
  }, []);
  // useEffect(() => {
  //   getForms((result) => {
  //     setForms(result.data);
  //     if (result.data.length > 0) {
  //       setSelectedForm(result.data[0]);
  //     }
  //   });
  // }, []);
  // useEffect(() => {
  //   setSelectedCheckAnswer({});
  //   setQuestionsAnswers([]);
  //   filtered = [];

  //   arr = [];
  //   joinedString = "";
  // }, [selectedForm]);

  const getStarted = () => {
    if (loggedInUser) {
      setShowGetStart(false);
      setShowDietForm(true);
    } else {
      navigate("/login");
    }
  };

  const onSelect = (selectedItemList) => {
    setSelectedDisease(selectedItemList[0]._id);
    if (selectedItemList && selectedItemList.length > 0) {
      getFormsWithDisease(selectedItemList[0]._id, (result) => {
        console.log(result.data, "RESSS");

        setFormsWithDisease(result.data);
        if (result.data.length > 0) {
          setSelectedForm(result.data[0].forms[0]);
          console.log(result.data[0].forms[0], "selectform");
        } else {
          setSelectedForm();
        }
      });
    }
  };

  const onClickSubmit = (e) => {
    e.preventDefault();
    const ids = questionsAnswers.map(({ question }) => question);
    filtered = questionsAnswers.filter(
      ({ question }, index) => !ids.includes(question, index + 1)
    );
    console.log(filtered);

    if (selectedDisease && selectedDisease.length > 0) {
      setError(false);
    } else {
      setError(true);
    }

    if (selectedDisease && filtered && filtered.length > 0) {
      submitSingleForm(
        selectedDisease,
        selectedForm,
        filtered,
        loggedInUser.token,
        (result) => {
          console.log(result);
          if (result.status === 200) {
            if (formsWithDisease[0].forms.length === i + 1) {
              setShowDietForm(false);
              setModal(true);
            } else {
              i = i + 1;
            }

            setSelectedCheckAnswer({});
            setQuestionsAnswers([]);
            filtered = [];

            arr = [];
            joinedString = "";
            setSelectedForm(formsWithDisease[0].forms[i]);
          }
        }
      );
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="nutritionist-modal-container">
          {showGetStart ? (
            <div className="nutritionist-start-container">
              <h1 className="diet-title">Customize Your Diet</h1>
              <button className="get-started-button" onClick={getStarted}>
                Get Started
              </button>
              {/* <div className="not-now-and-dont-show-again-container">
                <button className="not-now-button">Not Now</button>
                <div className="dont-show-again-container">
                  <input type="checkbox" id="show" />
                  <label className="show-label" htmlFor="show">
                    Don't Show me Again
                  </label>
                </div>
              </div> */}
            </div>
          ) : null}

          {showDietForm ? (
            <>
              <div className="nutritionist-diet-form-container">
                <div className="form-group">
                  <label>Select Disease</label>
                  <Multiselect
                    style={{
                      backgroundColor: " #fdfdff",
                      borderColor: " #e4e6fc",
                      border: "1px solid #ced4da",
                      borderRadius: ".25rem",
                      transition:
                        "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
                    }}
                    onSelect={onSelect}
                    required
                    options={diseases}
                    displayValue="name"
                    singleSelect="true"
                    placeholder="Select Disease"
                  />
                  {error ? (
                    <label className="text-danger">Please select Disease</label>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              {selectedForm ? (
                <div className="forms-container">
                  <div className="forms-names">
                    {/* {forms && forms.length > 0
                    ? forms.map((form, index) => {
                        return (
                          <h4 key={index} onClick={() => setSelectedForm(form)}>
                            {form.name}
                          </h4>
                        );
                      })
                    : null} */}
                    <h4 className="form-name">
                      {/* {formsWithDisease[0].forms[i].name} */}
                      {selectedForm.name}
                    </h4>
                  </div>
                  <form onSubmit={onClickSubmit}>
                    <div className="forms">
                      {selectedForm &&
                      selectedForm.questions &&
                      selectedForm.questions.length > 0
                        ? selectedForm.questions.map((question, i) => {
                            return (
                              <div key={question.question}>
                                <h5>
                                  {i + 1}. {question.question}
                                </h5>
                                {question.answerType === "RADIO_BUTTON"
                                  ? question.answerHint
                                      .split(",")
                                      .map((option) => {
                                        return (
                                          <li
                                            key={option}
                                            className="input-group"
                                          >
                                            <input
                                              type="radio"
                                              required={true}
                                              id={option}
                                              name={question.question}
                                              value={option}
                                              // checked={
                                              //   selectedRadioAnswer[
                                              //     question.question
                                              //   ] === option
                                              // }
                                              onChange={(e) => {
                                                handleTextChange(
                                                  e,
                                                  question,

                                                  question.answerType
                                                );
                                              }}
                                            />
                                            <label
                                              className="input-label"
                                              htmlFor={option}
                                            >
                                              {option}
                                            </label>
                                          </li>
                                        );
                                      })
                                  : null}
                                {question.answerType === "CHECK_BOX"
                                  ? question.answerHint
                                      .split(",")
                                      .map((option, index) => {
                                        return (
                                          <div
                                            className="input-group"
                                            key={index}
                                          >
                                            <input
                                              type="checkbox"
                                              id={option}
                                              name="answer"
                                              value={option}
                                              onChange={(e) =>
                                                handleTextChange(
                                                  e,
                                                  question,

                                                  question.answerType
                                                )
                                              }
                                            />
                                            <label
                                              className="input-label"
                                              htmlFor={option}
                                            >
                                              {option}
                                            </label>
                                          </div>
                                        );
                                      })
                                  : null}
                                {question.answerType === "TEXT_AREA" ? (
                                  <div className="input-group">
                                    <input
                                      required={true}
                                      type="text"
                                      placeholder="Enter your answer"
                                      name="answer"
                                      onChange={(e) =>
                                        handleTextChange(e, question)
                                      }
                                    />
                                  </div>
                                ) : null}
                                {question.answerType === "DROP_DOWN" ? (
                                  <>
                                    <select
                                      className="select-group"
                                      required={true}
                                      name="answer"
                                      onChange={(e) =>
                                        handleTextChange(e, question)
                                      }
                                    >
                                      <option>select</option>
                                      {question.answerHint
                                        .split(",")
                                        .map((option, index) => {
                                          return (
                                            <option value={option}>
                                              {option}
                                            </option>
                                          );
                                        })}
                                    </select>
                                  </>
                                ) : null}
                              </div>
                            );
                          })
                        : null}
                    </div>
                    <div className="form-submit-button">
                      <button className="nutri-submit-button" type="submit">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="no-records-container">No Records Found</div>
              )}
            </>
          ) : modal ? (
            <>
              <div className="nutri-thanks-container">
                <h1 className="thankyou-text">
                  Your Data Sent to Nutritionist
                </h1>
                <h1 className="thankyou-text">Wait for his Response</h1>
                <h1 className="thankyou-text">Thank You</h1>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
};

export default NutritionistModal;
