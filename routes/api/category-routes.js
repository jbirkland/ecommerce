const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
  const categoryData = await Category.findAll({
    include: [{model:Product}],
  });
    res.status(200).json(categoryData);

  } catch (err) {
    res.status(500).json(err);
  }
  
});


  // find one category by its `id` value
  // be sure to include its associated Products
  router.get('/:id', async (req, res) => {
    try {
      const categoryData = await Category.findByPk(req.params.id, {
        include: [{ model: Product }],
      });
  
      if (!categoryData) {
        res.status(404).json({ message: 'No category found with that id!' });
        return;
      }
  
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.post('/', async(req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

  router.put('/:id', (req, res) => {
    // update a tag's name by its `id` value
    Category.update(
      {
        // All the fields you can update and the data attached to the request body.
        category_name: req.body.category_name,
      },
      {
        // Gets the tagss based on the isbn given in the request parameters
        where: {
          id: req.params.id,
        },
      }
    )
      .then((updatedCategory) => {
        // Sends the updated tag as a json response
        res.json(updatedCategory);
      })
      .catch((err) => res.json(err));
  });
  
router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
