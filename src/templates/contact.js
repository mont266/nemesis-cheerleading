import React from 'react';
import _ from 'lodash';
import {graphql} from 'gatsby';

import {Layout} from '../components/index';
import {toStyleObj, withPrefix, htmlToReact} from '../utils';
import FormField from '../components/FormField';
import ContactForm from '../components/ContactForm'

// this minimal GraphQL query ensures that when 'gatsby develop' is running,
// any changes to content files are reflected in browser
export const query = graphql`
  query($url: String) {
    sitePage(path: {eq: $url}) {
      id
    }
  }
`;

export default class Page extends React.Component {
    render() {
<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes

        return (
            <Layout {...this.props}>
              <article className="post post-full">
                <header className="post-header has-gradient outer">
                  {_.get(this.props, 'pageContext.frontmatter.image', null) && (
                  <div className="bg-img" style={toStyleObj('background-image: url(\'' + withPrefix(_.get(this.props, 'pageContext.frontmatter.image', null)) + '\')')}/>
                  )}
                  <div className="inner-sm">
                    <h1 className="post-title">{_.get(this.props, 'pageContext.frontmatter.title', null)}</h1>
                    {_.get(this.props, 'pageContext.frontmatter.subtitle', null) && (
                    <div className="post-subtitle">
                      {htmlToReact(_.get(this.props, 'pageContext.frontmatter.subtitle', null))}
                    </div>
                    )}
                  </div>
                </header>
                <div className="inner-md outer">
                  <div className="post-content">
                    {htmlToReact(_.get(this.props, 'pageContext.html', null))}
                  </div>
                      <ContactForm />
{/*                   <form name={_.get(this.props, 'pageContext.frontmatter.form_id', null)} id={_.get(this.props, 'pageContext.frontmatter.form_id', null)} {...(_.get(this.props, 'pageContext.frontmatter.form_action', null) ? ({action: _.get(this.props, 'pageContext.frontmatter.form_action', null)}) : null)} name="contact" action="/thanks/" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={handleSubmit}>
                        <div className="screen-reader-text">
                          <label>Don't fill this out if you're human: <input name="bot-field" /></label>
                        </div>
                        <input type="hidden" name="form-name" value={_.get(this.props, 'pageContext.frontmatter.form_id', null)} />
                        {_.map(_.get(this.props, 'pageContext.frontmatter.form_fields', null), (field, field_idx) => (
                          <FormField key={field_idx} {...this.props} field={field} />
                        ))}
                        <div className="form-submit">
                          <button type="submit" className="button">{_.get(this.props, 'pageContext.frontmatter.submit_label', null)}</button>
                        </div>
                      </form> */}
                </div>
              </article>
            </Layout>
        );
    }
}
