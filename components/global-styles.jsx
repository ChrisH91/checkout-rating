import React from 'react'

export default () => (
  <style jsx global>
    {`
      @import url('https://cdn.jsdelivr.net/npm/destyle.css@1.0.11/destyle.css');
      @import url('https://fonts.googleapis.com/css?family=Lato|Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Source+Sans+Pro&display=swap');
      
      html,
      body,
      #__next {
        height: 100%;
      }

      body {
        background: linear-gradient(180deg, #444080 50%, #57529e 50%);
      }

      #__next {
        justify-content: center;
        align-items: center;
      }

      #__next,
      .flex {
        display: flex;
        flex: 1 1 auto;
      }
    `}
  </style>
);
