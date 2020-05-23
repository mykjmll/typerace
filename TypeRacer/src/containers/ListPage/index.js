/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {fetchHistory, resetData} from './action';
import {forwardTo} from '../../utils/commonHelper';
import Button from '../../components/Button';
import Loading from '../../components/LoadingIndicator';
import typing from '../../assets/typing.gif';
import styled from 'styled-components'

const Banner = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  background: url(${typing}) no-repeat;
  background-position: 50% 100%;
  background-size: cover;
  padding: 3rem 1rem;

  @media (${props => props.theme.mediaQuery.min.md}) {
    background-position: 100%;
    h2 {
      font-size:
    }
  }
`;
const TableContainer = styled.div`
  overflow-y: auto;
  max-height: 300px;
`;

const ListPage = ({ store, onFetchHistoryList, onResetData }) => {
  const { historyList, loading } = store;

  // get history list upon component mount
  useEffect(() => {
    onResetData();
    onFetchHistoryList();
  }, []);

  return(
    <React.Fragment>
      <Banner>
        <h2>Increase your typing speed!!!</h2>
        <Button className="col-12 col-lg-4" onClick={() => forwardTo('/game')}>
          Click to start
        </Button>
      </Banner>
      {loading && <Loading height="350px" /> }
      {!loading && (
        <TableContainer className="table-responsive text-center">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Speed</th>
                <th scope="col">Completion Percent</th>
                <th scope="col">Time</th>
                <th scope="col">Rank</th>
              </tr>
            </thead>
            <tbody>
              {historyList && historyList.map(dt => (
                <tr key={dt._id}>
                  <td>{dt.netwpm ? `${dt.netwpm} WPM` : '-'}</td>
                  <td>{dt.accuracy ? `${dt.accuracy}%` : '-'}</td>
                  <td>{dt.time ? `${dt.time} minutes` : '-'}</td>
                  <td>{dt.rank ? `${dt.rank}` : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      )}
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    store: state.ListPageReducer,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchHistoryList: () => dispatch(fetchHistory()),
    onResetData: () => dispatch(resetData()),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(ListPage);