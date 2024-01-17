import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import SaveIcon from '@mui/icons-material/Save';
import { Button } from 'primereact/button';
import { useParams } from 'react-router-dom';
import { useAuthUser } from 'react-auth-kit';
import { FilterMatchMode } from 'primereact/api';
import SearchIcon from '@mui/icons-material/Search';
import { reloadPage } from '../../../utils/reload';
import LoadingButton from './components/LoadingButton';
import { ModalGeneric } from '../../../components/ModalGeneric/ModalGeneric';
import { sizes } from '../../../utils/constants';
import ItemTemplateMobile from './components/ItemTemplateMobile';
import TableOffer from './components/TableOffer';
import { getSchoolById } from '../../../api/schoolRequests';
import {
  createOffer, getOfferByInepAndSupplier, getSupplierByUserId, getTotalOrder, updateOffer,
} from '../../../api/supplierRequests';
import { decryptUser } from '../../../utils/encryptId';
import { formatPrice } from '../../../utils/formatPrice';
import { formatDataSchool } from './utils/formatData';
import { useToast } from '../../../contexts/ToastContextProvider';

export default function SuppliersProposal() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [products, setProducts] = useState([]);
  const [schoolData, setSchoolData] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataSupplier, setDataSupplier] = useState({});
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [totalOrder, setTotalOrder] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [filters, setFilters] = useState();
  const [update, setUpdate] = useState(false);
  const [offerId, setOfferId] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [contentButton, setContentButton] = useState('SALVAR');
  const [initialProducts, setInitialProducts] = useState();
  const { inep } = useParams();
  const authUser = useAuthUser();
  const userToken = authUser().token;
  const cycleId = localStorage.getItem('cycle');
  const { showErrorToast, showInfoToast, showSuccessToast } = useToast();

  const onGlobalFilterChange = (e) => {
    const { value } = e.target;
    const newFilters = { ...filters };
    newFilters.global.value = value;
    setFilters(newFilters);
    setGlobalFilterValue(value);
  };

  const initFilters = () => {
    setFilters({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } });
    setGlobalFilterValue('');
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    initFilters();
    const fetchDataSchoolAndDataOffer = async () => {
      const dataSchool = await getSchoolById(inep, userToken);
      const dataSchoolFormatted = formatDataSchool(dataSchool);
      const newDataSupplier = await getSupplierByUserId(decryptUser(localStorage.getItem('userId')), userToken);
      const dataOffer = await getOfferByInepAndSupplier(
        inep,
        newDataSupplier.id,
        cycleId,
        userToken,
      );
      setSchoolData(dataSchoolFormatted);
      setDataSupplier(newDataSupplier);

      if (dataOffer.length === 0) {
        const dataOrder = await getTotalOrder(inep, cycleId, userToken);
        let productsFormatted = dataOrder.totalProducts;
        productsFormatted = productsFormatted
          .filter((product) => product.quantity !== 0)
          .map((product) => ({
            ...product,
            product_price: 0,
            brand: '',
          }));
        const copiedProducts = productsFormatted.map((order) => ({ ...order }));
        setInitialProducts(copiedProducts);
        setTotalOrder(dataOrder.totalOrdersIds);
        setProducts(productsFormatted);
      } else {
        setUpdate(true);
        const productsFormatted = dataOffer[0].offered_products;
        setOfferId(dataOffer[0].id);
        const copiedProducts = productsFormatted.map((order) => ({ ...order }));
        setInitialProducts(copiedProducts);
        setProducts(productsFormatted);
      }
    };
    fetchDataSchoolAndDataOffer();
  }, []);

  useEffect(() => {
    const totalPriceSum = products.reduce((accumulator, rowData) => {
      const precoUnitario = parseFloat(rowData.product_price) || 0;
      return accumulator + (precoUnitario * rowData.quantity);
    }, 0);
    setTotalPrice(totalPriceSum.toFixed(2));
  }, [products]);

  const handleSave = async () => {
    if (JSON.stringify(products) === JSON.stringify(initialProducts)) {
      showInfoToast('Nenhuma alteração foi feita na proposta, portanto não é necessário salvar.', 'Informação');
      setContentButton('SALVAR');
      setIsDisabled(false);
      return;
    }

    setContentButton(<LoadingButton />);
    setIsDisabled(true);

    const allFilled = products.every((product) => product.product_price !== null && product.product_price !== 0 && product.brand !== null && product.brand !== '');

    if (!allFilled) {
      showErrorToast('Preencha todos os campos', 'Erro');
      setContentButton('SALVAR');
      setIsDisabled(false);
      return;
    }

    const totalValue = products.reduce(
      (acc, product) => acc + product.product_price * product.quantity,
      0,
    );

    try {
      if (update) {
        const newUpdateOffer = await updateOffer(
          offerId,
          totalValue,
          dataSupplier.id,
          products,
          cycleId,
          userToken,
        );
        if (newUpdateOffer) {
          showSuccessToast('Proposta atualizada com sucesso!', 'Sucesso');
          reloadPage();
        }
      } else {
        const newOffer = await createOffer(
          totalValue,
          dataSupplier.id,
          cycleId,
          products,
          totalOrder,
          userToken,
        );
        if (newOffer) {
          showSuccessToast('Proposta salva com sucesso!', 'Sucesso');
          reloadPage();
        }
      }
    } catch (error) {
      if (update) {
        showErrorToast(error.error, 'Erro');
      } else {
        showErrorToast('Erro ao salvar a proposta.', 'Erro');
      }
      setContentButton('SALVAR');
      setIsDisabled(false);
    }
  };
  return (
    <main className="pageProposal flex flex-col w-screen items-center lg:flex-row md:flex-wrap md:justify-center">
      {isModalVisible && (
        <ModalGeneric
          visible={isModalVisible}
          food={selectedItem}
          onHide={() => setIsModalVisible(false)}
        />
      )}
      <div className="flex flex-col w-[90%] sm:w-[80%]">
        <div className="blockTitles flex justify-between self-center my-10 items-center w-full">
          <div className="school">
            <div className="flex items-start flex-col-reverse ">
              <h1 className="nameSchool text-blue text-xl sm:text-4xl font-extrabold pr-3">
                { schoolData.name }
              </h1>
              <h2 className="text-sm sm:text-2xl text-concrete  font-medium">PROPOSTA</h2>
            </div>
            <h2 className="addressSchool text-silver text-base sm:text-xl">
              {schoolData.address
              && schoolData.address.street
              && schoolData.address.district
              && schoolData.address.number
              && `${schoolData.address.street}, ${schoolData.address.district}, ${schoolData.address.number}`}
            </h2>
          </div>
          <div className="valueTotal flex flex-col items-end">
            <span className="text-silver text-2xl">TOTAL</span>
            <span className="priceProposal text-blue text-2xl font-bold whitespace-nowrap">
              { formatPrice(totalPrice) }
            </span>
          </div>
        </div>
        {windowWidth > sizes.md ? (
          <div className="container-table flex items-center self-center w-full">
            <div className="card w-full">
              <div className="flex flex-col mb-6 sm:flex-row sm:justify-between sm:items-end">
                <span className="p-input-icon-left w-full md:mr-6 text-silver">
                  <SearchIcon className="-translate-y-1" style={{ color: '#95A5A6' }} />
                  <InputText
                    value={globalFilterValue}
                    onChange={onGlobalFilterChange}
                    placeholder="Buscar"
                    className="w-full"
                  />
                </span>
                <Button
                  icon={<SaveIcon />}
                  label={contentButton}
                  className="w-[300px]"
                  disabled={isDisabled}
                  onClick={handleSave}
                />
              </div>
              <TableOffer
                products={products}
                globalFilterValue={globalFilterValue}
                filters={filters}
                setProducts={setProducts}
              />
            </div>
          </div>
        ) : (
          <div className="card">
            <div className="text-black text-xs p-3 border border-concrete rounded-xl mb-6">
              <p className="font-bold">
                Clique no ícone ao lado do produto para aplicar os valores.
              </p>
              <p>Lembre-se que os preços são informados por unidade de medida.</p>
              <p>Exemplo: R$ 5,00 o quilo (R$ 5,00/kg).</p>
            </div>
            <ItemTemplateMobile
              data={products}
              setSelectedItem={setSelectedItem}
              setIsModalVisible={setIsModalVisible}
              formatPrice={formatPrice}
              SaveIcon={SaveIcon}
            />
            <div className="flex items-center justify-center pb-5">
              <Button
                icon={<SaveIcon />}
                label={contentButton}
                className="w-[300px]"
                disabled={isDisabled}
                onClick={handleSave}
                rounded
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
