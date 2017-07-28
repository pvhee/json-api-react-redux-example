import React, { PropTypes } from 'react';
import Paragraph from '../Paragraph';
import { SERVER_ROOT } from '../../redux/middleware/api';

const propTypes = {
  question: PropTypes.object.isRequired,
};

function Question({ question }) {
  // console.log(question.fieldArticleTeaserImage);
  const paragraphs = question.fieldArticleBody.map(p => <Paragraph key={p.id} paragraph={p} />);
  const imgSrc = SERVER_ROOT + question.fieldArticleTeaserImage.url;

  return (
    <div className="question">
      {question.title}
      {paragraphs}
      <img src={imgSrc} role="presentation" width="300px"/>
    </div>
  );
}

Question.propTypes = propTypes;

export default Question;
