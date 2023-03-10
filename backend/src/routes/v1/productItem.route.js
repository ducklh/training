const express = require('express');
const validate = require('../../middlewares/validate');
const productController = require('../../controllers/productItem.controller');
const productValidation = require('../../validations/product.validation');
const { uploadMultiple } = require('../../middlewares/uploadfile');

const router = express.Router();
// router.post('/upload', uploadMultiple, (req, res, next) => {
//   const files = req.files
//   if (!files) {
//     const error = new Error('Please choose files')
//     error.httpStatusCode = 400
//     return next(error)
//   }
//   console.log(files);
// })

router.post('/create', uploadMultiple, validate(productValidation.createProduct), productController.createProduct);
// router.post('/create', (req, res) => res.send('ádasdasd'));

// router.route('/:categoryId')
router.get('/:id', validate(productValidation.getProductId), productController.getProductId);
router.patch('/:id', uploadMultiple, validate(productValidation.updateProduct), productController.updateProduct);
router.delete('/:id', validate(productValidation.deleteProduct), productController.deleteProduct);
router.get('/', validate(productValidation.getAllProduct), productController.getAllProduct);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management and retrieval
 */

/**
 * @swagger
 * path:
 *  /products:
 *    post:
 *      summary: Create a product
 *      description: Only admins can create other products.
 *      tags: [Products]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - name
 *                - productCode
 *                - productType
 *                - categoryId
 *                - price
 *                - description
 *                - imageAll
 *              properties:
 *                name:
 *                  type: string
 *              example:
 *                name: name product
 *                productCode: code product
 *                categoryId: categoryId
 *                typeProductId: typeProductId
 *                price: price
 *                description: description
 *                imgProduct: imgProduct
 *
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/productItem'
 *        "400":
 *          $ref: '#/components/responses/DuplicateEmail'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *
 *    get:
 *      summary: Get all products
 *      description: Only admins can retrieve all products.
 *      tags: [Products]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: name
 *          schema:
 *            type: string
 *          description:  name
 *        - in: query
 *          name: sortBy
 *          schema:
 *            type: string
 *          description: sort by query in the form of field:desc/asc (ex. name:asc)
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *            minimum: 1
 *          default: 10
 *          description: Maximum number of categories
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *            minimum: 1
 *            default: 1
 *          description: Page number
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  results:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Product'
 *                  page:
 *                    type: integer
 *                    example: 1
 *                  limit:
 *                    type: integer
 *                    example: 10
 *                  totalPages:
 *                    type: integer
 *                    example: 1
 *                  totalResults:
 *                    type: integer
 *                    example: 1
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * path:
 *  /products/{id}:
 *    get:
 *      summary: Get a product
 *      description: Only admins can fetch other products.
 *      tags: [Products]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Product id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Product'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    patch:
 *      summary: Update a product
 *      description: Only admins can update other products.
 *      tags: [Products]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Product id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *
 *              example:
 *                name: name product
 *                productCode: code product
 *                categoryId:  categoryId
 *                typeProductId: typeProductId
 *                price: price
 *                description: description
 *                imgProduct: imgProduct
 *
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Category'
 *        "400":
 *          $ref: '#/components/responses/DuplicateEmail'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    delete:
 *      summary: Delete a product
 *      description: Only admins can delete other products.
 *      tags: [Products]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Product id
 *      responses:
 *        "200":
 *          description: No content
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 */
