import React, { PropTypes } from 'react';
import Paragraph from '../Paragraph';

const propTypes = {
  question: PropTypes.object.isRequired,
};

function Question({ question }) {
  console.log(question.fieldArticleBody);
  // const postWidgets = question.posts.map(post => <Post key={post.id} post={post} />);
  const paragraphs = question.fieldArticleBody.map(p => <Paragraph key={p.id} paragraph={p} />);

  return (
    <div className="question">
      {question.title}
      {paragraphs}
    </div>
  );
}

Question.propTypes = propTypes;

export default Question;
