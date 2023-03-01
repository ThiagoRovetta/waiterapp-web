import React, { useEffect, useState } from 'react';

import {
  Overlay,
  ModalBody,
  Actions,
  Form,
  FormGroup,
  InputImageContainer,
  ImageContainer,
  InputContainer,
  CategoryContainer,
  IngredientsAction,
  SearchContainer,
  IngredientsContainer,
  Ingredient,
  Categories
} from './styles';

import closeIcon from '../../assets/images/close-icon.svg';
import { Product, Ingredient as IngredientType } from '../../types/Product';
import { ImageIcon } from '../Icons/ImageIcon';
import { NoImageIcon } from '../Icons/NoImageIcon';
import { Category } from '../../types/Category';
import { SearchIcon } from '../Icons/SearchIcon';
import { CheckboxOffIcon } from '../Icons/CheckboxOffIcon';
import { CheckboxOnIcon } from '../Icons/CheckboxOnIcon';
import { IngredientModal } from '../IngredientModal';
import { DeleteProductModal } from '../DeleteProductModal';

interface FormDataType {
  name: string;
  description: string;
  price: string;
  category: string;
  ingredients: IngredientType[]
  image: File | Blob;
}

interface ProductModalProps {
  visible: boolean;
  product: Product | null;
  categories: Category[];
  isLoading: boolean;
  onClose: () => void;
  onAddProduct: (payload: FormDataType) => Promise<void>;
  onUpdateProduct: (id: string, payload: FormDataType) => Promise<void>;
  onDeleteProduct: (id: string) => Promise<void>;
}

interface CheckedIngredients {
  [id: string]: boolean;
}

export function ProductModal({
  visible,
  product,
  categories,
  isLoading,
  onClose,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
}: ProductModalProps) {
  const [imagePath, setImagePath] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<Blob | null>(null);
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);
  const [name, setName] = useState(product?.name || '');
  const [description, setDescription] = useState(product?.description || '');
  const [showAllCategories, setShowAllCategories] = useState(product === null ? true : false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(product?.category?._id || null);
  const [isNewIngredientModalOpen, setIsNewIngredientModalOpen] = useState(false);
  const [searchIngredient, setSearchIngredient] = useState('');
  const [ingredients, setIngredients] = useState<IngredientType[]>(product?.ingredients || []);
  const [checkedIngredients, setCheckedIngredients] = useState<CheckedIngredients>(product?.ingredients?.reduce((acc, { name }) => {
    return { ...acc, [name]: true };
  }, {}) || {} as CheckedIngredients);
  const [price, setPrice] = useState<number | null>(product?.price || null);
  const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);

  function onImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      setImagePath(event.target.files[0].name);
      setImageFile(event.target.files[0]);
      setImagePreview(URL.createObjectURL(event.target.files[0]));
    }
  }

  function handleCheckInput(name: string) {
    setCheckedIngredients((prevState) => {
      return {
        ...prevState,
        [name]: !prevState[name]
      };
    });
  }

  function handleCloseIngredientModal() {
    setIsNewIngredientModalOpen(false);
  }

  function handleCloseDeleteProductModal() {
    setIsDeleteProductModalOpen(false);
  }

  function handleAddIngredient(newIngredient: IngredientType) {
    setIngredients((prevState) => [ ...prevState, newIngredient]);
  }

  async function handleAddProduct() {
    onAddProduct({
      image: imageFile!,
      name,
      description,
      price: String(price!),
      category: selectedCategory!,
      ingredients: ingredients.filter((ingredient) => Object.keys(checkedIngredients).includes(ingredient.name) && checkedIngredients[ingredient.name]),
    });
  }

  async function handleUpdateProduct() {
    onUpdateProduct(product!._id, {
      image: imageFile!,
      name,
      description,
      price: String(price!),
      category: selectedCategory!,
      ingredients: ingredients.filter((ingredient) => Object.keys(checkedIngredients).includes(ingredient.name) && checkedIngredients[ingredient.name]),
    });
  }

  async function handleDeleteProduct(id: string) {
    onDeleteProduct(id);
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    setImagePath(product?.imagePath || null);
    setImageFile(product?.imagePath ? new Blob([product.imagePath], { type: 'image/png' }) : null);
    setImagePreview(product?.imagePath ? `http://localhost:3001/uploads/${product.imagePath}` : undefined);
    setName(product?.name || '');
    setDescription(product?.description || '');
    setShowAllCategories(product === null ? true : false);
    setSelectedCategory(product?.category?._id || null);
    setIngredients(product?.ingredients || []);
    setCheckedIngredients(product?.ingredients?.reduce((acc, { name }) => {
      return { ...acc, [name]: true };
    }, {}) || {} as CheckedIngredients);
    setPrice(product?.price || null);
  }, [product]);

  useEffect(() => {
    if (product) {
      if (
        product.imagePath !== imagePath
        || product.name !== name
        || product.description !== description
        || product.category._id !== selectedCategory
        || product.price !== price
        // || product.ingredients !== ingredients
      ) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    } else {
      if (
        imagePath !== null
        && name !== ''
        && description!== ''
        && selectedCategory !== null
        && price !== null
        // || product.ingredients !== ingredients
      ) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  }, [imagePath, name, description, selectedCategory, price]);

  if (!visible) {
    return null;
  }

  return (
    <>
      <Overlay>
        <ModalBody>
          <header>
            <strong>
              {product ? 'Editar Produto' : 'Novo Produto'}
            </strong>

            <button type="button" onClick={onClose}>
              <img src={closeIcon} alt="Ícone de fechar" />
            </button>
          </header>

          <Form>
            <div className="product">
              <FormGroup>
                <label className='strong'>Imagem</label>
                <InputImageContainer>
                  <ImageContainer>
                    {product || imagePreview ? (
                      <img src={imagePreview} alt="imagem do produto" />
                    ) : <NoImageIcon />}
                  </ImageContainer>
                  <InputContainer>
                    <label>
                      <ImageIcon /> Alterar imagem
                      <input type="file" id="image" onChange={onImageChange} />
                    </label>
                  </InputContainer>
                </InputImageContainer>
              </FormGroup>
              <FormGroup>
                <label htmlFor="name">Nome do produto</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Ex: Quatro queijos"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="name">Descrição</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Ex: Pizza de quatro queijos com borda tradicional"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {/* <p>Máximo 110 caracteres</p> */}
              </FormGroup>
              <CategoryContainer className={`${showAllCategories ? '' : 'selected'}`}>
                <label>Categoria</label>
                <Categories>
                  {categories.map((category) => {
                    if (!showAllCategories && category._id !== selectedCategory) {
                      return null;
                    }

                    return (
                      <React.Fragment key={category._id}>
                        <input
                          type="radio"
                          id={category.name}
                          name="category"
                          value={category._id}
                          checked={selectedCategory === category._id}
                          onChange={(e) => showAllCategories ? setSelectedCategory(e.target.value) : null}
                        />
                        <label
                          htmlFor={category.name}
                          className={`${showAllCategories ? 'selectable' : ''}`}
                        >
                          <p>{category.icon}</p><p>{category.name}</p>
                          {!showAllCategories && (
                            <button
                              type="button"
                              onClick={() => setShowAllCategories(true)}
                            >
                              Alterar
                            </button>
                          )}
                        </label>
                      </React.Fragment>
                    );
                  })}
                </Categories>
              </CategoryContainer>
            </div>

            <div className="ingredients">
              <FormGroup>
                <IngredientsAction>
                  <label htmlFor="name" className='strong'>Ingredientes</label>
                  <button type='button' onClick={() => setIsNewIngredientModalOpen(true)}>
                    Novo Ingrediente
                  </button>
                </IngredientsAction>
              </FormGroup>
              <FormGroup>
                <label htmlFor="search">Busque o ingrediente</label>
                <SearchContainer>
                  <input
                    type="text"
                    id="search"
                    name="search"
                    placeholder="Ex: Quatro queijos"
                    value={searchIngredient}
                    onChange={(e) => setSearchIngredient(e.target.value)}
                  />
                  <SearchIcon />
                </SearchContainer>
              </FormGroup>
              <IngredientsContainer>
                {ingredients
                  .filter((ingredient) => {
                    if (searchIngredient === '') {
                      return ingredient;
                    } else if (ingredient.name.toLowerCase().includes(searchIngredient.toLowerCase())) {
                      return ingredient;
                    }
                  })
                  .map((ingredient) => (
                    <Ingredient key={ingredient.name}>
                      <div>
                        <p>{ingredient.icon}</p>
                        <p>{ingredient.name}</p>
                      </div>
                      <label htmlFor={ingredient.name}>
                        <input
                          type="checkbox"
                          id={ingredient.name}
                          name="checkbox"
                          // checked={checkedIngredients[ingredient.name]}
                          // onChange={() => handleCheckInput(ingredient.name)}
                        />
                        <span onClick={() => handleCheckInput(ingredient.name)}>
                          {checkedIngredients[ingredient.name] ? (
                            <CheckboxOnIcon />
                          ) : (
                            <CheckboxOffIcon />
                          )}
                        </span>
                      </label>
                    </Ingredient>
                  ))
                }
              </IngredientsContainer>
              <FormGroup>
                <label htmlFor="price">Preço (R$)</label>
                <input
                  type="number"
                  id='price'
                  value={price ?? 0}
                  min={0}
                  step={0.01}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </FormGroup>
            </div>
          </Form>

          <Actions className={`${product ? '' : 'add-mode'}`}>
            {
              product && (
                <button
                  type="button"
                  className="secondary"
                  onClick={() => setIsDeleteProductModalOpen(true)}
                  disabled={isLoading}
                >
                  Excluir produto
                </button>
              )
            }

            <button
              type="button"
              className='primary'
              disabled={isLoading || disabled}
              onClick={() => product ? handleUpdateProduct() : handleAddProduct()}
            >
              {product ? 'Salvar Alterações' : 'Adicionar Produto'}
            </button>
          </Actions>
        </ModalBody>

        <IngredientModal
          visible={isNewIngredientModalOpen}
          onClose={handleCloseIngredientModal}
          onAddIngredient={handleAddIngredient}
          ingredients={ingredients}
        />

        <DeleteProductModal
          visible={isDeleteProductModalOpen}
          onClose={handleCloseDeleteProductModal}
          onDeleteProduct={handleDeleteProduct}
          product={product}
        />
      </Overlay>
    </>
  );
}
