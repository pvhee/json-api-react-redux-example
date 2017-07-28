import React, { PropTypes } from 'react';

const propTypes = {
  paragraph: PropTypes.object.isRequired,
};

function Paragraph({ paragraph }) {
    // const commentWidgets = post.comments.map(c => <Comment key={c.id} comment={c} />);
  const body = (paragraph.fieldParagraphBody && paragraph.fieldParagraphBody.value) || '';
  // console.log(paragraph);
  return (
    <div className="paragraph">
      { body}
    </div>
  );
}

Paragraph.propTypes = propTypes;

export default Paragraph;
