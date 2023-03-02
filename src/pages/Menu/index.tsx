import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Container, NavContent, NavTab } from './styles';

import { Title } from '../../components/Title';
import { api } from '../../utils/api';
import { Ingredient, Product } from '../../types/Product';
import { Table } from '../../components/Table';
import { TrashIcon } from '../../components/Icons/TrashIcon';
import { PencilIcon } from '../../components/Icons/PencilIcon';
import { formatCurrency } from '../../utils/formatCurrency';
import { ProductModal } from '../../components/ProductModal';
import { Category } from '../../types/Category';
import { DeleteProductModal } from '../../components/DeleteProductModal';
import { CategoryModal } from '../../components/CategoryModal';
import { DeleteCategoryModal } from '../../components/DeleteCategoryModal';

interface FormDataTypeCategory {
  icon: string;
  name: string;
}

interface FormDataType {
  name: string;
  description: string;
  price: string;
  category: string;
  ingredients: Ingredient[]
  image: File | Blob;
}

export function Menu() {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [isDeleteProductModalVisible, setIsDeleteProductModalVisible] = useState(false);
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [isDeleteCategoryModalVisible, setIsDeleteCategoryModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function getData() {
    Promise.all([
      api.get('/products'),
      api.get('/categories'),
    ]).then(([productsResponse, categoriesResponse]) => {
      setProducts(productsResponse.data);
      setCategories(categoriesResponse.data);
      setIsLoading(false);
    }).catch((error) => {
      console.log(error);
      toast.error(error);
      setIsLoading(false);
    });
  }

  async function addProduct({
    name, description, price, category, ingredients, image
  }: FormDataType) {
    const formData = new FormData();

    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('ingredients', String(ingredients));
    formData.append('image', image);

    api.post('/products', formData)
      .then((response) => {
        toast.success('Produto adicionado com sucesso!');

        const newProduct = {
          _id: response.data._id,
          name: response.data.name,
          description: response.data.description,
          price: response.data.price,
          category: categories.find((category) => category._id === response.data.category)!,
          ingredients: response.data.ingredients,
          imagePath: response.data.imagePath,
        };

        setProducts((prevState) => [ ...prevState, newProduct]);

        handleCloseProductModal();
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  async function updateProduct(id: string, {
    name, description, price, category, ingredients, image
  }: FormDataType) {
    const formData = new FormData();

    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('ingredients', String(ingredients));
    formData.append('image', image);

    api.put(`/products/${id}`, formData)
      .then((response) => {
        toast.success('Produto alterado com sucesso!');

        setProducts((prevState) => {
          const newState = [ ...prevState ];

          const index = newState.findIndex((prod) => prod._id === id);

          if (index > -1) {
            newState[index] = response.data;
          }

          return newState;
        });

        handleCloseProductModal();
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  async function deleteProduct(id: string) {
    api.delete(`/products/${id}`)
      .then(() => {
        toast.success('Produto excluído com sucesso!');

        setProducts((prevState) => {
          const newState = [ ...prevState ];

          const index = newState.findIndex((prod) => prod._id === id);

          if (index > -1) {
            newState.splice(index, 1);
          }

          return newState;
        });

        handleCloseProductModal();
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  async function addCategory({ name, icon }: FormDataTypeCategory) {
    api.post('/categories', { name, icon })
      .then((response) => {
        toast.success('Categoria adicionada com sucesso!');

        const newCategory = {
          _id: response.data._id,
          icon: response.data.icon,
          name: response.data.name,
        };

        setCategories((prevState) => [ ...prevState, newCategory]);

        handleCloseCategoryModal();
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  async function updateCategory(id: string, {
    name, icon
  }: FormDataTypeCategory) {
    api.put(`/categories/${id}`, { name, icon })
      .then((response) => {
        toast.success('Categoria alterada com sucesso!');

        setCategories((prevState) => {
          const newState = [ ...prevState ];

          const index = newState.findIndex((cat) => cat._id === id);

          if (index > -1) {
            newState[index] = response.data;
          }

          return newState;
        });

        handleCloseCategoryModal();
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  async function deleteCategory(id: string) {
    api.delete(`/categories/${id}`)
      .then(() => {
        toast.success('Categoria excluída com sucesso!');

        setCategories((prevState) => {
          const newState = [ ...prevState ];

          const index = newState.findIndex((cat) => cat._id === id);

          if (index > -1) {
            newState.splice(index, 1);
          }

          return newState;
        });

        handleCloseCategoryModal();
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  function handleOpenProductModal(product?: Product) {
    if (product) {
      setSelectedProduct(product);
    }
    setIsProductModalVisible(true);
  }

  function handleOpenDeleteProductModal(product?: Product) {
    if (product) {
      setSelectedProduct(product);
    }
    setIsDeleteProductModalVisible(true);
  }

  function handleCloseProductModal() {
    setSelectedProduct(null);
    setIsProductModalVisible(false);
  }

  function handleCloseDeleteProductModal() {
    setSelectedProduct(null);
    setIsDeleteProductModalVisible(false);
  }

  function handleOpenCategoryModal(category?: Category) {
    if (category) {
      setSelectedCategory(category);
    }
    setIsCategoryModalVisible(true);
  }

  function handleOpenDeleteCategoryModal(category?: Category) {
    if (category) {
      setSelectedCategory(category);
    }
    setIsDeleteCategoryModalVisible(true);
  }

  function handleCloseCategoryModal() {
    setSelectedCategory(null);
    setIsCategoryModalVisible(false);
  }

  function handleCloseDeleteCategoryModal() {
    setSelectedCategory(null);
    setIsDeleteCategoryModalVisible(false);
  }

  if (isLoading) {
    return null;
  }

  return (
    <>
      <ProductModal
        visible={isProductModalVisible}
        product={selectedProduct}
        categories={categories}
        isLoading={false}
        onClose={handleCloseProductModal}
        onAddProduct={addProduct}
        onUpdateProduct={updateProduct}
        onDeleteProduct={deleteProduct}
      />

      <DeleteProductModal
        visible={isDeleteProductModalVisible}
        onClose={handleCloseDeleteProductModal}
        onDeleteProduct={deleteProduct}
        product={selectedProduct}
      />

      <CategoryModal
        visible={isCategoryModalVisible}
        category={selectedCategory}
        isLoading={false}
        onClose={handleCloseCategoryModal}
        onAddCategory={addCategory}
        onUpdateCategory={updateCategory}
        onDeleteCategory={deleteCategory}
      />

      <DeleteCategoryModal
        visible={isDeleteCategoryModalVisible}
        onClose={handleCloseDeleteCategoryModal}
        onDeleteCategory={deleteCategory}
        category={selectedCategory}
      />

      <Container>
        <NavTab>
          <div
            className={`tab ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <p>Produtos</p>
          </div>
          <div
            className={`tab ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            <p>Categorias</p>
          </div>
        </NavTab>
        <NavContent>
          {activeTab === 'products' && (
            <>
              <Title
                title='Produtos'
                quantity={products.length}
                label='Novo Produto'
                onClick={() => handleOpenProductModal()}
              />
              <Table>
                <thead>
                  <tr>
                    <th style={{ width: '15%' }}>Imagem</th>
                    <th style={{ width: '30%' }}>Nome</th>
                    <th style={{ width: '25%' }}>Categoria</th>
                    <th style={{ width: '25%' }}>Preço</th>
                    <th style={{ width: '5%' }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id}>
                      <td>
                        <img
                          src={`http://localhost:3001/uploads/${product.imagePath}`}
                          alt={product.name}
                          width="48"
                          height="40"
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>{`${product.category.icon} ${product.category.name}`}</td>
                      <td>{formatCurrency(product.price)}
                      </td>
                      <td>
                        <div className="actions">
                          <button type="button" onClick={() => handleOpenProductModal(product)}>
                            <PencilIcon />
                          </button>
                          <button type="button" onClick={() => handleOpenDeleteProductModal(product)}>
                            <TrashIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
          {activeTab == 'categories' && (
            <>
              <Title
                title='Categorias'
                quantity={categories.length}
                label='Nova Categoria'
                onClick={() => handleOpenCategoryModal()}
              />
              <Table>
                <thead>
                  <tr>
                    <th>Emoji</th>
                    <th style={{ width: '90%' }}>Nome</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map(category => (
                    <tr key={category._id}>
                      <td>{category.icon}</td>
                      <td>{category.name}</td>
                      <td>
                        <div className="actions">
                          <button type="button" onClick={() => handleOpenCategoryModal(category)}>
                            <PencilIcon />
                          </button>
                          <button type="button" onClick={() => handleOpenDeleteCategoryModal(category)}>
                            <TrashIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </NavContent>
      </Container>
    </>
  );
}
