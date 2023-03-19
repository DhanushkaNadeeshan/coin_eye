import { useState } from "react";
import Main from "./Main";
import Modal from "../theme/Modal";
import Button from "../theme/Button";
import InputText from "../theme/InputText";
import data from "../utils/questions.json";
import Question from "./stage-tx/QuestionSetting";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../utils/slice/userSlice";
import { setAlert } from "../utils/slice/alertSlice";
import { selectWalletAddress } from "../utils/slice/accountSlice";
import { setLoader } from "../utils/slice/loaderSlice";
import axios from "axios";
import { dataDecryptedAES } from "../utils/app";
import CryptoJS from "crypto-js";
import { ConfirmMessage } from "../theme/Message";

export default function Setting() {
  const securityQuestions = data.securityQuestions;

  const dispatch = useDispatch();

  const userSelector = useSelector(selectUser);
  const address = useSelector(selectWalletAddress);

  const [statusModalQuestion, setStatusModalQuestion] = useState(false);
  const [isRequestRecovery, setIsRequestRecovery] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [recoveryQuestionList, setRecoveryQuestionList] = useState([]);
  const [recoveryQuestion, setRecoveryQuestion] = useState("");
  const [message, setMessage] = useState("");
  const [callBack, setCallBack] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [openConMsgTransferAcc, setOpenConMsgTransferAcc] = useState(false);
  const [errorHandling, setErrorHandling] = useState({
    anwser: "",
    question: "",
    recoveryQuestion: "",
  });

  const sendAlert = (type, message) => {
    const state = {
      type: type,
      message: message,
      isShow: true,
    };
    dispatch(setAlert(state));
  };

  const openModalQuestion = (callBackFn) => {
    setStatusModalQuestion(true);
    setCallBack(callBackFn);
  };

  const closeModalQuestion = () => {
    setStatusModalQuestion(false);
  };

  const close = (status) => {
    closeModalQuestion();

    switch (status) {
      case "updateQuestion":
        updateSecuirtyQuestion();
        break;
      case "requesthquestion":
        requestPrivateKey();
        break;
      default:
        break;
    }
  };

  const resetInputs = () => {
    const tempValidation = {
      anwser: "",
      question: "",
      recoveryQuestion: "",
    };
    setAnswer("");
    setQuestion("");
    setErrorHandling({ ...tempValidation });
  };

  const updateSecuirtyQuestion = () => {
    let isErrorThere = false;

    const tempValidation = {
      anwser: "",
      question: "",
      recoveryQuestion: "",
    };

    if (!answer) {
      tempValidation.anwser = "This feild is required!";
      isErrorThere = true;
    }

    if (!question) {
      tempValidation.question = "Please pick a question!";
      isErrorThere = true;
    }

    if (isErrorThere) {
      return setErrorHandling({ ...tempValidation });
    }

    const sendData = {
      id: userSelector.id,
      securityQuestion: question,
      answer: answer,
    };

    const url = "/api/user";

    axios
      .put(url, sendData)
      .then(({ data }) => {
        sendAlert("success", "Succesfully update the quesion");
        resetInputs();
      })
      .catch((error) => {
        sendAlert("warning", "Something is goin wrong!");
        console.log("🚀 ~ file: Setting.js:50 ~ axios.put ~ error:", error);
      });
  };

  const sendRequestToRecovery = () => {
    setIsRequestRecovery(true);

    const url = `/api/user/recovery/${userSelector.id}`;

    axios
      .get(url)
      .then(({ data }) => {
        if (data.success) {
          sendAlert("success", "Your request is aproved , please try!");
          setRecoveryQuestionList(data.result);
        }
      })
      .catch((error) => {
        console.log("🚀 ~ file: Setting.js:71 ~ axios.get ~ error:", error);
        sendAlert("warning", "Something is goin wrong!");
      });
  };

  const updateRevoryQuestion = () => {
    let isErrorThere = false;

    const tempValidation = {
      anwser: "",
      question: "",
      recoveryQuestion: "",
    };

    if (!recoveryQuestion) {
      tempValidation.recoveryQuestion = "This feild is required!";
      isErrorThere = true;
    }

    const sendData = {
      id: userSelector.id,
      securityQuestion: recoveryQuestion,
    };

    if (isErrorThere) {
      return setErrorHandling({ ...tempValidation });
    }

    const url = `/api/user/recovery/`;

    axios
      .put(url, sendData)
      .then(({ data }) => {
        if (data.result.status === "dined") {
          sendAlert("error", data.result.msg);
        } else {
          sendAlert(
            "success",
            "Your security question has been successfully updated!"
          );

          setMessage(data.result.msg);
        }
        const closeAlertTimer = setTimeout(() => {
          setIsRequestRecovery(false);
          setMessage("");
        }, 15 * 1000);
        return () => clearTimeout(closeAlertTimer);
      })
      .catch((error) => {
        console.log("🚀 ~ file: Setting.js:96 ~ axios.put ~ error:", error);
        sendAlert("warning", "Something is goin wrong!");
      });
  };

  const requestPrivateKey = () => {
    axios
      .get(`/api/account/ETH/${address}`)
      .then(({ data }) => {
        sendAlert("success", "Your requst is approved!");

        const decryptedData = dataDecryptedAES(CryptoJS, data.result);
        setPrivateKey(decryptedData.private_key);
      })
      .catch((error) => {
        sendAlert("warning", "Something is goin wrong!");
        console.log(
          "🚀 ~ file: Setting.js:119 ~ requestPrivateKey ~ error:",
          error
        );
      });
  };

  const transferToNewAccount = () => {
    setOpenConMsgTransferAcc(false);

    dispatch(
      setLoader({
        isShow: true,
        message: "Just a moment! Your request is being processed",
      })
    );

    axios.post("/api/account/ETH/recovery", { address }).catch((error) => {
      dispatch(
        setLoader({
          isShow: false,
          message: "",
        })
      );
      sendAlert("error", "TX fail");
      console.log("🚀 ~ file: Setting.js:233 ~ axios.post ~ error:", error);
    });
  };

  return (
    <Main name="Setting">
      {/* confrim message */}
      {openConMsgTransferAcc && (
        <ConfirmMessage
          message={"Do you want to quickly transfer to new account ?"}
          confrim={transferToNewAccount}
          close={() => setOpenConMsgTransferAcc(false)}
        ></ConfirmMessage>
      )}

      <div className="bg-slate-800 p-4 ">
        <p className="border-b text-blue-500 border-blue-500">
          Reset the question
        </p>
        <div className="p-4">
          <p className="py-2 text-blue-400">Security Question (New):</p>

          <select
            className="w-full border-b-2 bg-inherit text-slate-200 border-slate-500 px-2 focus:outline-none focus:border-sky-500"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          >
            <option value="" className="text-slate-900">
              Select a question
            </option>

            {securityQuestions.map((data, i) => (
              <option value={data} className="text-slate-900" key={i}>
                {data}
              </option>
            ))}
          </select>
          <label className="text-red-400"> {errorHandling.question}</label>
          <p className="py-2 text-blue-400">Anwser (New)</p>

          <InputText
            name="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <label className="text-red-400"> {errorHandling.anwser}</label>

          <div className="flex justify-end">
            <div className="w-32 m-4">
              <Button onClick={() => openModalQuestion("updateQuestion")}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 p-4 my-4 ">
        <p className="border-b text-blue-500 border-blue-500">Recovery</p>
        <div className="p-4">
          {!isRequestRecovery && (
            <>
              <p className="p-4 text-blue-400 border-l bg-slate-700 border-blue-400 my-4">
                If your account has been temporarily blocked, please follow
                these steps to unblock the system.
              </p>
              <div className="w-64 my-4 mx-auto ">
                <Button type="warning" onClick={sendRequestToRecovery}>
                  Request recovery
                </Button>
              </div>
            </>
          )}

          {isRequestRecovery && (
            <>
              {message && (
                <div className="w-2/4 border-t border-green-300 bg-slate-700 p-2 my-2 mx-auto ">
                  <p className="text-center text-green-400">{message}</p>
                </div>
              )}

              <p className="m-2 text-blue-500">
                Please select the security question you have previously entered
                into the system :
              </p>
              <select
                value={recoveryQuestion}
                onChange={(e) => setRecoveryQuestion(e.target.value)}
                className="w-full border-b-2 bg-inherit text-slate-200 border-slate-500 px-2 focus:outline-none focus:border-sky-500"
              >
                <option value="" className="text-slate-900">
                  Select a question
                </option>

                {recoveryQuestionList.map((data, i) => (
                  <option value={data} className="text-slate-900" key={i}>
                    {data}
                  </option>
                ))}
              </select>
              <label className="text-red-400">
                {" "}
                {errorHandling.recoveryQuestion}
              </label>
              <p className="p-4 text-red-400 border-l bg-slate-700 border-red-400 my-4">
                Please be informed that your security question will be selected
                from the following options. Kindly review the choices carefully.
                In the event that you are unable to provide the correct answer,
                <b>your account will be permanently blocked</b>. Thank you for
                your attention to this matter.
              </p>

              <div className="flex justify-end">
                <div className="w-32 m-4">
                  <Button onClick={updateRevoryQuestion}>Save</Button>
                </div>
                <div className="w-32 m-4">
                  <Button
                    type="warning"
                    onClick={() => setIsRequestRecovery(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="bg-slate-800 p-4 my-4 ">
        <p className="border-b text-red-500 border-red-800">See private key</p>
        <div className="p-4">
          <p className="text-center text-slate-200 p-2">{privateKey}</p>

          <div className="w-64 my-4 mx-auto ">
            <Button
              type="error"
              onClick={() => openModalQuestion("requesthquestion")}
            >
              Request my private key
            </Button>
          </div>

          <p className="p-2 text-red-400 border-l bg-slate-700 border-red-400 my-4">
            Warning: If your crypto private key is leaked, your funds are at
            risk of being stolen. Take immediate action to secure your accounts
            and transfer your funds to a new address. Do not share your private
            key with anyone and regularly monitor your account for any
            suspicious activity.
          </p>
        </div>
      </div>

      <div className="bg-slate-800 p-4 my-4 ">
        <p className="border-b text-red-500 border-red-800">
          My private key is leaked
        </p>
        <div className="p-4">
          <div className="w-64 my-4 mx-auto ">
            <Button onClick={() => setOpenConMsgTransferAcc(true)}>
              Quickly transfer to new account
            </Button>
          </div>

          <p className="p-2 text-blue-400 border-l bg-slate-700 border-blue-400 my-4">
            Warning: Clicking "Create New Account and Transfer All Crypto"
            transfers available funds only. No guarantee of stolen money
            recovery.
          </p>
        </div>
      </div>
      <Modal
        title="Security"
        action={statusModalQuestion}
        closeHandle={closeModalQuestion}
      >
        <Question closeModal={close} callBack={callBack} />
      </Modal>
    </Main>
  );
}
