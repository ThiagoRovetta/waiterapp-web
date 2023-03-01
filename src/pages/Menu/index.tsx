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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function getProducts() {
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

        handleCloseModal();
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

        handleCloseModal();
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

        handleCloseModal();
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  useEffect(() => {
    getProducts();
  }, []);

  function handleOpenModal(product?: Product) {
    if (product) {
      setSelectedProduct(product);
    }
    setIsModalVisible(true);
  }

  function handleOpenDeleteModal(product?: Product) {
    if (product) {
      setSelectedProduct(product);
    }
    setIsDeleteModalVisible(true);
  }

  function handleCloseModal() {
    setSelectedProduct(null);
    setIsModalVisible(false);
  }

  function handleCloseDeleteModal() {
    setSelectedProduct(null);
    setIsDeleteModalVisible(false);
  }

  if (isLoading) {
    return null;
  }

  return (
    <>
      <ProductModal
        visible={isModalVisible}
        product={selectedProduct}
        categories={categories}
        isLoading={false}
        onClose={handleCloseModal}
        onAddProduct={addProduct}
        onUpdateProduct={updateProduct}
        onDeleteProduct={deleteProduct}
      />

      <DeleteProductModal
        visible={isDeleteModalVisible}
        onClose={handleCloseDeleteModal}
        onDeleteProduct={deleteProduct}
        product={selectedProduct}
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
          <Title
            title='Produtos'
            quantity={products.length}
            label='Novo Produto'
            onClick={() => handleOpenModal()}
          />
          <Table>
            <thead>
              <tr>
                <th>Imagem</th>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Preço</th>
                <th>Ações</th>
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
                      <button type="button" onClick={() => handleOpenModal(product)}>
                        <PencilIcon />
                      </button>
                      <button type="button" onClick={() => handleOpenDeleteModal(product)}>
                        <TrashIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </NavContent>
      </Container>
    </>
  );
}
