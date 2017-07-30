import React, { PropTypes } from 'react';

const propTypes = {
  paragraph: PropTypes.object.isRequired,
};

function Paragraph({ paragraph }) {
    // const commentWidgets = post.comments.map(c => <Comment key={c.id} comment={c} />);
  // const type = paragraph.type;
  console.log(paragraph);

  switch (paragraph.type) {
    case 'paragraphParagraphText':
      return (<div className="paragraph">{paragraph.fieldParagraphBody.value}</div>);
    case 'paragraphParagraphArteVideo':
      return (<div dangerouslySetInnerHTML={{ __html: paragraph.fieldParagraphProgramId }} />);
    default:
      return (<div>{paragraph.type}</div>);
  }

  // paragraphParagraphText
  // Paragraph.jsx?be67:11 paragraphParagraphTextImage
  // Paragraph.jsx?be67:11 paragraphParagraphArteCollection
  // Paragraph.jsx?be67:11 paragraphParagraphText
  // Paragraph.jsx?be67:11 paragraphParagraphArteVideo
  // Paragraph.jsx?be67:11 paragraphParagraphText

  // const body = (paragraph.fieldParagraphBody && paragraph.fieldParagraphBody.value) || '';
  // // console.log(paragraph);
  // return (
  //   <div className="paragraph">
  //     { body}
  //   </div>
  // );
}

Paragraph.propTypes = propTypes;

export default Paragraph;
