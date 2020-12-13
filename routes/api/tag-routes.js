const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// find all tags
// be sure to include its associated Product data
  router.get('/', async (req, res) => {
    try {
      const tagData = await Tag.findAll({
        include: [Category, { model: Product, through: ProductTag }],
    }),
  }
  .then((products) => res.json(products))
     .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
  });



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
    try {
      const productData = await Product.create(req.body);
      res.status(200).json(productData);
      } catch (err) {
        res.status(400).json(err);
      }
    });
  

// update a tag's name by its `id` value   ??
//router.put('/:id', (req, res) => {
  
//});


// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.status(200).json(tagData);
  
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
