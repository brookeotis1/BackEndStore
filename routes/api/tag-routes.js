const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// find all tags
// be sure to include its associated Product data
  router.get('/', async (req, res) => {
    Tag.findAll({
        include: [Category, { model: Product, through: ProductTag }],
    })
  
  .then((category) => res.json(category))
     .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
  })


  // find a single tag by its `id`
  // be sure to include its associated Product data
  router.get('/:id', async (req, res) => {
    const tagData = await Tag.findOne ({
  
    })
  
    .then((tags) => res.json(tags))
     .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
  });



// create a new tag
  router.post('/', (req, res) => {
    Product.create(req.body)
     .then ((category) => res.status(200).json(category))
     .catch((err) => {
      console.log(err);
      res.status(400).json(err);
     
    }); 
  }); 
  

// update a tag's name by its `id` value   ??
//router.put('/:id', (req, res) => {
  
//});


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
