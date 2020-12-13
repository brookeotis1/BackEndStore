const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// find all categories
  // be sure to include its associated Products
  
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [Product, { model: Tag, through: ProductTag }],
    }),
  }
  .then((category) => res.json(category))
     .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
  });


  // find one category by its `id` value
  // be sure to include its associated Products
  router.get('/:id', async (req, res) => {
    const categoryData = await Category.findOne ({
  
    })
  
    .then((category) => res.json(category))
     .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
  });
  

// create a new category

router.post('/', (req, res) => {
  try {
   const categoryData = await Category.create(req.body);
   res.status(200).json(categoryData);
   } catch (err) {
    res.status(400).json(err);
      }
    });  



// update a category by its `id` value - same as product? 
//router.put('/:id', (req, res) => {
  
//});


// delete a category by its `id` value
router.delete('/:id', (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
