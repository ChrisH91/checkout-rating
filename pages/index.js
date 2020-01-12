import React from 'react'
import GlobalStyles from '../components/global-styles'
import Feedback from '../components/feedback';

export default () => [
  <GlobalStyles key="styles" />,
  <Feedback key="content" />,
  //       <div style={{ width: '100%', maxWidth: '900px' }} className="feedback-container">
  //         <Feedback />
  //       </div>
  //       <style jsx>
  //         {`
  //           .container {
  //             height: 100%;
  //           }

  //           .feedback-container {
  //             width: 100%;
  //             max-width: 900px;
  //           }
  //         `}
  //       </style>
  //     </Row>
  //   </Content>
  // </Layout>
]
