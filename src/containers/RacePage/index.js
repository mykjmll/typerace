/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useRef} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import RandomText from '../../components/RandomText';
import Timer from '../../components/Timer';
import Progressbar from '../../components/ProgressBar';
import Loading from '../../components/LoadingIndicator';
import Button from '../../components/Button';
import {loadData, postData, resetData} from './action';
import { forwardTo } from '../../utils/commonHelper';
import StyledRace, {Input} from './StyledRace'
import $ from 'jquery';

const RacePage = ({ store, onGetRandomText, onPostHistoryData, onResetData }) => {
  const {randomText, loading} = store;
  const inputEl = useRef(null);
  const [state, setState] = useState({
    randomTextArr: [],
    remTextArr: [],
    inputTextArr: [],
    inputErrorArr: [],
    inputText: '',
    wpm: 0,
    accuracy: 0,
    end: false,
    countdownTtimer: null,
    completed: '',
    grosswpm: '',
  });
  const { randomTextArr, inputText, remTextArr, inputTextArr, inputErrorArr,
    end, countdownTtimer, wpm, accuracy, completed, grosswpm} = state;
  const user = localStorage.getItem('username');

  // get random words to start the game
  useEffect(() => {
    onGetRandomText();
    inputEl.current.focus();
    onResetData();
  }, []);
  // set random text to state
  useEffect(() => {
    if(randomText) {
      const wordsArr = randomText[0].split(' ').filter((item) => item !== '');
      setState(prevState => ({...prevState, randomTextArr: wordsArr, remTextArr: wordsArr}))
    }
  }, [randomText]);

  // manage input functions
  useEffect(() => {
    handleTextChanges();
  }, [inputText]);

  const handleChange = e => {
    const val = e.target.value;
    setState(prevState => ({...prevState, inputText: val}));
  }
  const handleTextChanges = () => {
    const lastChar = inputText[inputText.length - 1];
    const lastWord = remTextArr.length === 1;
    if (lastChar === ' ' || ( lastWord && inputText === remTextArr[0] ) ) {
      if (inputText === remTextArr[0] + ' ' || inputText === remTextArr[0]  ) {
        inputEl.current.style = 'background: none';
        inputEl.current.style.outlineColor = '#28a745';
        inputTextArr.push(remTextArr[0])
        const newremTextArr = remTextArr.filter((f, idx) => idx !== 0);
        setState(prevState => ({...prevState, inputText: '', remTextArr: newremTextArr  }));
      } else {
        inputErrorArr.push(inputText);
        inputEl.current.style = 'background: #dc354580';
        inputEl.current.style.outlineColor = '#dc3545';
      }
    } 
  }

  // start and end race functions
  useEffect(() => {
    if(countdownTtimer) {
      const totalTimeTaken = timeToDecimal(countdownTtimer);
      if(countdownTtimer !== '03:00') {
        if(remTextArr.length === 0) {
          handleEndRace(totalTimeTaken);
        }
      } else {
        handleEndRace(totalTimeTaken);
      }
    }
  }, [countdownTtimer]);

  const handleEndRace = totalTimeTaken => {
    setState(
      prevState => ({...prevState, end: true })
    );
    handleWPM(totalTimeTaken);
  }
  const setCountdownTtimer = countdownTtimer => {
    setState(
      prevState => ({...prevState, countdownTtimer })
    );
  }

  // get wpm functions
  const handleWPM = totalTimeTaken => {
    const grosswpm = parseInt((inputTextArr.length / totalTimeTaken));
    const netwpm = parseInt((inputTextArr.length - inputErrorArr.length) / totalTimeTaken);
    const accuracy = !Number.isNaN(netwpm / grosswpm) ? parseInt((netwpm / grosswpm) * 100) : 0;
    const completed = parseInt((inputTextArr.length / randomTextArr.length) * 100);
    setState(
      prevState => ({...prevState, wpm: netwpm, accuracy, completed, inputText: '', grosswpm })
    ); 
    const historyData = {
      user,
      netwpm,
      accuracy,
      completed,
      time: countdownTtimer,
      rank: evals()
    }
    onPostHistoryData(historyData);
  }

  const timeToDecimal = t => {
    var arr = t.split(':');
    var dec = parseInt((arr[1]/6)*10, 10);

    return parseFloat(parseInt(arr[0], 10) + '.' + (dec<10?'0':'') + dec);
  } 

  const evals = () => {
    if (wpm < '40') {
      return 'ROOKIE';
    }
    if ((wpm >= '40' ) && (wpm < '120')) {
      return 'VETERAN';
    }
    if ((wpm >= '120' ) && (wpm < '180')) {
      return 'MASTER';
    }
    if (wpm >= '180') {
      return 'LEGENDARY';
    }
  }

  const percentage = parseInt((inputTextArr.length / randomTextArr.length) * 100);

  $('[data-toggle="tooltip"]').tooltip();

  return(
    <React.Fragment>
      <StyledRace>
        <div>
          {loading && <Loading height="350px" />}
          {!loading && (
          <>
            <div className="mb-3">
              {!end && (
                <Timer setCountdownTtimer={setCountdownTtimer} countdownTtimer={countdownTtimer} />
              )}
              <Progressbar value={percentage} disabled />
            </div>
            <RandomText randomTextArr={randomTextArr} inputTextArr={inputTextArr} inputText={inputText} />
            <Input type="text" ref={inputEl} onChange={handleChange} value={inputText} disabled={end} />
          </>
          )}
        </div>
        {end && ( 
          <>
            <div className="row border p-3 mb-3">
              <div className="col-12 col-lg-8 text-left">
                <div> Time: {countdownTtimer} </div>
                <div> 
                    Gross Words Per Minute
                    <div className="icon">
                      <img data-toggle="tooltip" data-placement="top" title="Total Words Typed / Total Time Taken (in minutes)" src="https://img.icons8.com/metro/26/000000/info.png" alt="info"/>
                    </div>
                    : {Math.round(grosswpm)} WPM 
                </div>
                <div> 
                    Net Speed
                    <div className="icon">
                      <img data-toggle="tooltip" data-placement="top" title="(Total Words Typed - Word Error ) / Total Time Taken (in minutes)" src="https://img.icons8.com/metro/26/000000/info.png" alt="info"/>
                    </div>
                  : {Math.round(wpm)} WPM
                </div>
                <div> 
                  Accuracy
                  <div className="icon">
                    <img data-toggle="tooltip" data-placement="top" title="(Net WPM/ Gross WPM ) * 100" src="https://img.icons8.com/metro/26/000000/info.png" alt="info"/>
                  </div>
                  : {`${accuracy}%`} 
                </div>
                <div> Completion Percentage: {`${completed}%`} </div>
                <div> You completed {inputTextArr.length} out of {randomTextArr.length} words in {countdownTtimer} minutes </div>
                
              </div>
              <div className="col-12 col-lg-4 font-weight-bold">
                <h3> Evaluation: </h3>
                <h1>{evals()}</h1>
              </div>
            </div>
          </>
        )}
        <div className="mt-5">
          <Button className="col-12 col-lg-4" onClick={() => forwardTo('/list')}>
            Back to list
          </Button>
        </div>
      </StyledRace>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    store: state.RacePageReducer,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetRandomText: () => dispatch(loadData()),
    onPostHistoryData: data => dispatch(postData(data)),
    onResetData: () => dispatch(resetData()),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(RacePage);