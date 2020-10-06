import React from 'react';
import _ from 'lodash';
import {graphql} from 'gatsby';

import {Layout} from '../components/index';
import {toStyleObj, withPrefix, htmlToReact} from '../utils';
import FormField from '../components/FormField';

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default function Contact() {
  const [state, setState] = React.useState({})

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch((error) => alert(error))
  }

    const formStyle = {
      alignSelf: 'center',
      width: "100%",
    }
    const inputStyle = {
        width: "100%"
    }
    const buttonStyle = {
        alignSelf: 'center',
        backgroundColor: '#0066f9',
        color: '#fff',
        width: 350,
        height: 40
    }

  return (
    <div>
      <h1>Contact Us</h1>
      <form
        style={formStyle}
        name="contact"
        method="post"
        action="/thanks/"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
        <input type="hidden" name="form-name" value="contact" />
        <p hidden>
          <label>
            Don’t fill this out: <input name="bot-field" onChange={handleChange} />
          </label>
        </p>
        <p>
          <label>
            Your name:
            <br />
            <input style={inputStyle} type="text" name="name" onChange={handleChange} />
          </label>
        </p>
        <p>
          <label>
            Your email:
            <br />
            <input style={inputStyle} type="email" name="email" onChange={handleChange} />
          </label>
        </p>
        <p>
          <label>
            Message:
            <br />
            <textarea style={inputStyle} name="message" onChange={handleChange} />
          </label>
        </p>
        <p>
          <button style={buttonStyle} type="submit">Send</button>
        </p>
      </form>
    </div>
  )
}