const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint
// get all products
// find all products
// be sure to include its associated Category and Tag data

router.get('/', async (req, res) => {
  
  Product.findAll({
    include: [Category, { model: Tag, through: ProductTag }],
  })

.then((products) => res.json(products))
.catch((err) => {
  console.log(err);
  res.status(400).json(err);
  });
})


// get one product
// find a single product by its `id`
// be sure to include its associated Category and Tag data
router.get('/:id', (req, res) => {
  Product.findOne ({

  })

  .then((products) => res.json(products))
   .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});




// create new product
router.post('/', (req, res) => {
  
  Product.create(req.body)
    .then ((product) => res.status(200).json(product))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
   
  }); 
});

  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
 


//update product
router.put('/:id', (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      //find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      //get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      //create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      //figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      //run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});


// delete one product by its `id` value
router.delete('/:id', async (req, res) => {
  
    Product.destroy({
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
