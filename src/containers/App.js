import React, { useState, useEffect } from "react";
import WellList from "../components/WellList";
import PlaceBox from "../components/PlaceBox";
import ReportPalette from "../components/ReportPalette";
import "./App.css";

function App() {
  const [place, setplace] = useState([0, 0]);
  const [fullWells, setFullWell] = useState([]);
  const [isInPlate, SetIsinPlate] = useState(false);
  const [initialiseX, SetinitialiseX] = useState(false);
  const [initialiseY, SetinitialiseY] = useState(false);
  const [report, SetReport] = useState("");
  const [userErrors, SetUserError] = useState("");
  const [fileErrors, SetFileError] = useState("");
  const [numOfClicks, SetnumOfClicks] = useState(0);
  const [contntF, SetContentF] = useState([]);
  useEffect(() => {}, [
    fullWells,
    place,
    isInPlate,
    report,
    userErrors,
    fileErrors,
  ]);
  const CheckPlate = (x, y) => {
    //This Method Checkes If The Robot is On the Plate Or not
    //And Set the State Variable In This Regard!!
    if (x > 0 && x < 6 && y > 0 && y < 6) {
      SetIsinPlate(true);
      return true;
    } else {
      SetIsinPlate(false);
      return false;
    }
  };
  const onPlaceXChange = (event) => {
    //  This Method Is In Charge Of Changing X
    let Xtarget = event.target.value * 1;
    if (Number.isInteger(Xtarget)) {
      var currentPlace = place;
      CheckPlate(Xtarget, currentPlace[1]);
      if (Xtarget > 0 && Xtarget < 6) {
        SetinitialiseX(true);
        setplace([Xtarget, currentPlace[1]]);
        if (userErrors.includes("X")) SetUserError("");
      } else {
        let ER = "Please Enter A Valid Integer For X !";
        SetUserError(ER);
      }
    } else {
      let ER = "Please Enter An Integer between 0 and 5 !";
      SetUserError(ER);
    }
  };
  const onPlaceYChange = (event) => {
    //  This Method Is In Charge Of Changing Y
    let Ytarget = event.target.value * 1;
    if (Number.isInteger(Ytarget)) {
      var currentPlace = place;
      CheckPlate(currentPlace[0], Ytarget);
      if (Ytarget > 0 && Ytarget < 6) {
        SetinitialiseY(true);
        setplace([currentPlace[0], Ytarget]);
        if (userErrors.includes("Y")) SetUserError("");
      } else {
        let ER = "Please Enter A Valid Integer between 0 and 5 !";
        SetUserError(ER);
      }
    } else {
      let ER = "Please Enter An Integer For Y !";
      SetUserError(ER);
    }
  };
  const canDrop = () => {
    //This Method Checks For Validity To Drop! The Well Should be Empty!
    return initialiseX && initialiseY && DETECT().includes("EMPTY");
  };
  const DETECT = () => {
    var res = isInPlate
      ? fullWells.some((x) => x === (5 - place[0]) * 5 + place[1])
        ? "FULL"
        : "EMPTY"
      : "ERR";
    return res;
  };
  const goDirection = (dir) => {
    //This Methods Is Responsible For N S W E Directions
    let CK = false;
    switch (dir.trim()) {
      case "E":
        CK = CheckPlate(place[0], place[1] + 1);
        CK ? setplace([place[0], place[1] + 1]) : SetIsinPlate(true);
        break;
      case "S":
        CK = CheckPlate(place[0] - 1, place[1]);
        CK ? setplace([place[0] - 1, place[1]]) : SetIsinPlate(true);
        break;
      case "W":
        CK = CheckPlate(place[0], place[1] - 1);
        CK ? setplace([place[0], place[1] - 1]) : SetIsinPlate(true);
        break;
      case "N":
        CK = CheckPlate(place[0] + 1, place[1]);
        CK ? setplace([place[0] + 1, place[1]]) : SetIsinPlate(true);
        break;
      default:
        CK = CheckPlate(place[0], place[1]);
        CK ? setplace([place[0], place[1]]) : SetIsinPlate(true);
        break;
    }
  };
  const OnDorpClicked = () => {
    //Drop Function
    let PlaceForDrop = (5 - place[0]) * 5 + place[1] * 1;
    let currentFulls = fullWells;
    currentFulls.push(PlaceForDrop);
    setFullWell(currentFulls);
    setplace([place[0], place[1]]);
  };
  const OnReportClicked = () => {
    //Report Function
    let isFull = isInPlate
      ? fullWells.some((x) => x === (5 - place[0]) * 5 + place[1])
        ? "FULL"
        : "Empty"
      : "ERR";
    SetReport(
      "The Well Is (" + place[0] + ", " + place[1] + ", " + isFull + ")"
    );
  };
  const OnDetectClicked = () => {
    //Report Function

    SetReport("The Well Is " + DETECT());
  };
  ////////////////////////FILE//////////////////////////////////
  const parseFile = (Line) => {
    //This Method Is Rsponsible For Parsing Contents From the File And Executing them
    if (Line.length < 1) {
      return;
    }
    if (Line.toLowerCase().includes("move ") && initialiseX && initialiseY) {
      var words = Line.split(" ");
      goDirection(words[words.length - 1]);
    } else if (Line.toLowerCase().includes("place ")) {
      let P = Line.split(" ");
      let axios = P[P.length - 1].split(",");
      CheckPlate(axios[0] * 1, axios[1] * 1);
      setplace([axios[0] * 1, axios[1] * 1]);
      SetinitialiseX(true);
      SetinitialiseY(true);
    } else if (
      Line.toLowerCase().trim().includes("drop") &&
      initialiseX &&
      initialiseY
    ) {
      if (DETECT().includes("EMPTY")) {
        OnDorpClicked();
      } else {
        FileErrorHndler(
          "\n A Request For Dropping Out Of Plate Or In A Full Well Was Ignored!"
        );
      }
    } else if (Line.toLowerCase().trim().includes("detect")) {
      OnDetectClicked();
    } else if (Line.toLowerCase().trim().includes("report")) {
      OnReportClicked();
    } else if (Line.length > 0) {
      setTimeout(() => {
        FileErrorHndler("");
      }, 2000);
      FileErrorHndler("\n An Unknown Request Was Ignored!");
    }
  };
  let fileReader = new FileReader();
  const OnFileReaderChanged = (event) => {
    //Reading From The Uploaded File
    let file = event.target.files[0];
    if (file && file.name.toLowerCase().includes(".txt")) {
      // fileReader.onloadend = handleFileRead;
      let contents = fileReader.readAsText(file);
      return contents;
    } else {
      FileErrorHndler("\n Unknown File Format! You Should Enter Text Files!");
    }
  };
  const OnFileExecClicked = () => {
    var k = numOfClicks;

    if (k === 0) {
      var content = fileReader.result;
      if (content == null) {
        return;
      }
      var a = content.split("\n");
      a = a.filter((v) => v.trim() !== "");
      SetContentF(a);
      parseFile(a[k]);
    } else {
      if (contntF !== null && contntF !== undefined) {
        if (k <= contntF.length) {
          parseFile(contntF[k]);
        }
      }
    }
    SetnumOfClicks(k + 1);
  };
  const FileErrorHndler = (Etext) => {
    SetFileError(Etext);
  };
  ////////////////////////RETURN//////////////////////////////////
  return (
    <div className="tc">
      <h1 className="f1">Robotic Pipette</h1>
      <div className="mainLayout">
        <div className="CommandPalette">
          <div className="dib">
            <span className="pa2 db dark-pink">Place:</span>
            <PlaceBox placeChange={onPlaceXChange} ax={"X"} />
            <PlaceBox placeChange={onPlaceYChange} ax={"Y"} />
            <span className="pa4 db dark-red">{userErrors}</span>
          </div>
          {initialiseX && initialiseY && (
            <div className="dib">
              <div>
                <button
                  className="f6 link dim ph3 pv2 mb2 dib white bg-navy"
                  onClick={() => goDirection("N")}
                >
                  N
                </button>
              </div>
              <button
                className="f6 link dim ph3 pv2 mb2 dib white bg-navy ma1"
                onClick={() => goDirection("W")}
              >
                W
              </button>
              <button
                className="f6 link dim ph3 pv2 mb2 dib white bg-navy ma1"
                onClick={() => goDirection("S")}
              >
                S
              </button>
              <button
                className="f6 link dim ph3 pv2 mb2 dib white bg-navy ma1"
                onClick={() => goDirection("E")}
              >
                E
              </button>
            </div>
          )}
          {(!initialiseX || !initialiseY) && (
            <span className="pa2 db dark-pink">
              Please Choose A Place At First!
            </span>
          )}
          <div>
            {canDrop() && (
              <button
                className="f6 link dim ph3 pv2 mb2 dib white bg-dark-pink"
                onClick={() => OnDorpClicked()}
              >
                DROP
              </button>
            )}
          </div>
        </div>

        <div className="dib">
          <WellList place={place} fullWells={fullWells} isInPlate={isInPlate} />
        </div>
        <div className="dib">
        {(initialiseX && initialiseY) && (
        <button
            className="ma2 f6 link dim ph3 pv2 mb2 dib white bg-dark-green"
            onClick={() => OnReportClicked()}
          >
            REPORT
          </button>)}
          {(initialiseX && initialiseY) && (<button
            className="ma2 f6 link dim ph3 pv2 mb2 dib white bg-dark-green"
            onClick={() => OnDetectClicked()}
          >
            DETECT
          </button>)}
          <ReportPalette reportText={report} />
          <div>
            <span className="pa2 db green">
              Choose A File To Execute Commands!
            </span>
            <input
              className="white ba"
              accept=".txt"
              type="file"
              id="myFile"
              name="filename"
              onChange={(e) => OnFileReaderChanged(e)}
            />
            <div>
              <button
                className="ma2 f6 link dim ph3 pv2 mb2 dib white bg-dark-green"
                onClick={() => OnFileExecClicked()}
              >
                {numOfClicks === 0
                  ? "PRESS TO EXECUTE FIRST LINE OF FILE"
                  : (numOfClicks===contntF.length?"END OF THE FILE":"PRESS TO EXECUTE NEXT LINE OF FILE")}
              </button>
            </div>
            <span className="pa4 db dark-red">{fileErrors}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
