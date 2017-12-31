const express = require('express');
const router = express.Router();
const Document = require('./models').Document;

// YOUR API ROUTES HERE

console.log("inside api routes file");

router.post('/newPost', (req, res)=>{
    console.log('in new post');
    const newPost = new Document(req.body);
    newPost.save(doc=>{return doc})
  .then(resp=>res.send(resp))
  .catch(err=>console.log(err));
});

router.post('/updatedoc', (req, res) => {
    console.log('update doc', req.body);
    Document.findById(req.body.id, (err, doc) => {
        if (err) {
            console.error(err);
        } else {
            doc.body = req.body.body;
            doc.inlineStyles = req.body.inlineStyles;
            var timeStamp = Date.now();
            doc.history = Object.assign({}, doc.history, { [timeStamp]: {EditorState: req.body.body, inlineStyles: req.body.inlineStyles}});
            console.log('document after updated', doc);
            doc.save((error, result)=>{
                if (error) {
                    res.send(error);
                } else {
                    res.send('body updated');
                }
            });
        }
    });
});

router.post('/getPost', (req, res)=>{
    Document.findById(req.body.docid)
  .then(resp=>res.send(resp))
  .catch(err=>console.log(err));
});

router.post('/getContents', (req, res)=>{
    Document.find()
  .then(documents=>{
      console.log(documents);
      res.send(documents);
  })
  .catch(err=>console.log(err));
});

// SAMPLE ROUTE
router.use('/users', (req, res) => {
    res.json({ success: true });
});

module.exports = router;
