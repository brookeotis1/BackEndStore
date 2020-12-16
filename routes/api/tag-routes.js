const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// find all tags
// be sure to include its associated Product data
  router.get('/', (req, res) => {
    Tag.findAll({
        include: [Product, { model: Product, through: ProductTag }],
    })
  
  .then((tags) => res.json(tags))
     .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
  })


  // find a single tag by its `id`
  // be sure to include its associated Product data
  router.get('/:id',  (req, res) => {
    Tag.findOne ({
  where: {id:req.params.id}
    })
  
    .then((tags) => res.json(tags))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
  });



// create a new tag
  router.post('/', (req, res) => {
    Tag.create(req.body)
     .then ((category) => res.status(200).json(category))
     .catch((err) => {
      console.log(err);
      res.status(400).json(err);
     
    }); 
  }); 
  

// update a tag's name by its `id` value   ??
router.put('/:id', (req, res) => {
  Tag.update(req.body, {where: {id:req.params.id}})
    .then ((category) => res.status(200).json(category))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
     
    });
});


// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
   Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    .then ((category) => res.status(200).json(category))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
  });
});


module.exports = router;
