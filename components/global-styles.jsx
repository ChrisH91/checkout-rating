import React from 'react';

export default () => (
  <style jsx global>
    {`
      @import url('https://cdn.jsdelivr.net/npm/destyle.css@1.0.11/destyle.css');
      @import url('https://fonts.googleapis.com/css?family=Lato|Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Source+Sans+Pro&display=swap');

      html,
      body,
      #__next {
        height: 100%;
        min-height: 100%;
      }

      body {
        font-family: 'Lato', sans-serif;
        background: linear-gradient(180deg, #444080 50%, #57529e 50%);
      }

      a {
        color: #58539e;
      }

      a:active,
      a:hover {
        cursor: pointer;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        text-align: center;
      }

      h2 {
        font-size: 16px;
        font-weight: bold;
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

      .row {
        flex-direction: row;
      }

      .col {
        flex-direction: column;
      }

      .justify-center {
        justify-content: center;
      }

      input:disabled,
      button:disabled,
      textarea:disabled {
        opacity: 0.65;
      }

      input[type='text'],
      input[type='number'],
      textarea {
        border-bottom: 1px solid #ccc;
        margin-bottom: 18px;
        padding: 4px 1px;
      }

      input[type='text']:focus,
      input[type='number']:focus,
      textarea:focus {
        border-bottom: 1px solid #444080;
      }

      button {
        background: #444080;
        text-transform: uppercase;
        color: white;
        padding: 12px;
        text-align: center;
        border-radius: 2px;
      }

      button:enabled:focus,
      button:enabled:hover {
        box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.5);
      }

      textarea {
        line-height: 20px;
        height: 100px;
      }

      .shadow {
        box-shadow: 0px 0px 25px 5px rgba(0, 0, 0, 0.25);
      }
    `}
  </style>
);
