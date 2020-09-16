import React from 'react';
import _ from 'lodash';
import {graphql} from 'gatsby';

import {Layout} from '../components/index';
import {toStyleObj, withPrefix, htmlToReact} from '../utils';
import FormField from '../components/FormField';

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
                  <form name={_.get(this.props, 'pageContext.frontmatter.form_id', null)} id={_.get(this.props, 'pageContext.frontmatter.form_id', null)} {...(_.get(this.props, 'pageContext.frontmatter.form_action', null) ? ({action: _.get(this.props, 'pageContext.frontmatter.form_action', null)}) : null)}method="POST" data-netlify="true" data-netlify-honeypot="bot-field">
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
                      </form>
                </div>
              </article>
            </Layout>
        );
    }
}
