import React from 'react';
import PropTypes from 'prop-types';
import {
  FlexibleWidthXYPlot, YAxis, XAxis, HorizontalGridLines, VerticalGridLines, LineSeries,
} from 'react-vis';
import 'react-vis/dist/style.css';

export default function feedbackResult(props) {
  const { ratings } = props;
  const data = ratings.map((rating, index) => ({
    x: index,
    y: rating,
  }));

  return (
    <div>
      <FlexibleWidthXYPlot height={200} yDomain={[1, 5]}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <YAxis tickValues={[1, 2, 3, 4, 5]} />
        <XAxis hideTicks />
        <LineSeries data={data} />
      </FlexibleWidthXYPlot>
      <style jsx>
        {`
          form {
            display: flex;
            flex-direction: column;
          }
        `}
      </style>
    </div>
  );
}

feedbackResult.propTypes = {
  ratings: PropTypes.arrayOf(PropTypes.number).isRequired,
};
