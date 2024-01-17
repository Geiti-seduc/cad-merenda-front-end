/* eslint-disable no-magic-numbers */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BreadCrumb } from 'primereact/breadcrumb';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useAuthUser } from 'react-auth-kit';
import { getOfferById } from '../../../api/foodListRequests';
import { getSupplierById } from '../../../api/supplierRequests';
import SupplierInfo from '../../../components/FormFields/SupplierInfo';
import { getAddressById } from '../../../api/addressRequests';
import DownloadCertificateSchool from './components/DownloadCertificateSchool';
import DivTitle from './components/DivTitle';
import { getExpirationCertificates } from '../../../api/certificateRequests';
import { useToast } from '../../../contexts/ToastContextProvider';

function SuppliersOffer() {
  const authUser = useAuthUser();
  const userToken = authUser().token;
  const { showToast } = useToast();
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState({});
  const [certificates, setCertificates] = useState([]);
  const { id } = useParams();
  const [supplier, setSupplier] = useState([]);
  const navigate = useNavigate();

  const items = [
    {
      label: 'Melhores Fornecedores',
      command: () => { navigate('/escola/fornecedores'); },
    },
    { label: 'Oferta' },
  ];

  const home = { label: 'Página Inicial', command: () => { navigate('/escola'); } };

  useEffect(() => {
    const fetchSupplierData = async (supplierId) => {
      try {
        const supplierData = await getSupplierById(supplierId, userToken);
        setSupplier(supplierData);
        const addressData = await getAddressById(supplierData.address_id, userToken);
        setAddress(addressData);
        const certificatesData = await getExpirationCertificates(
          supplierData.user_id,
          userToken,
        );
        setCertificates(certificatesData);
      } catch (error) {
        showToast('error', 'Erro', error.message);
      }
    };

    const fetchData = async () => {
      try {
        const res = await getOfferById(id, userToken);
        const newProducts = res.offers[0].offered_products.map((product) => ({
          ...product,
          fullname: `${product.name}, ${product.description}`,
        }));
        setProducts(newProducts);
        fetchSupplierData(res.offers[0].supplier_id);
      } catch (error) {
        showToast('error', 'Erro', error.message);
      }
    };

    fetchData();
  }, []);

  const calculateTotalSum = () => {
    let total = 0;
    if (products.length > 0) {
      products.forEach((product) => {
        total += parseFloat(product.product_price, 10) * parseFloat(product.quantity, 10);
      });
    }
    return total;
  };

  return (
    <div
      className="flex flex-col py-12 items-center"
    >
      <div className="flex flex-col w-10/12">
        <div>
          <BreadCrumb model={items} home={home} />
        </div>
        <p
          className="lg:text-3xl text-xl text-blue
        font-extrabold my-10"
        >
          {supplier ? supplier.company_name : ''}
        </p>
        <DataTable
          value={products}
          removableSort
          className="border-b border-silver pb-5"
        >
          <Column
            field="fullname"
            header="ITEM"
            style={{ width: '40rem' }}
            sortable
          />
          <Column
            field="brand"
            header="MARCA"
            bodyStyle={{ whiteSpace: 'nowrap' }}
          />
          <Column
            field="measure"
            header="MEDIDA"
            sortable
            style={{ width: '8rem' }}
          />
          <Column
            field="product_price"
            body={(rowData) => `R$ ${rowData.product_price
              .toFixed(2).replace('.', ',')}`}
            header="PREÇO UN."
          />
          <Column
            field="quantity"
            header="QTD"
            sortable
          />
          <Column
            field="precoTotal"
            body={(rowData) => (rowData.product_price * rowData.quantity).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            header="TOTAL"
            bodyStyle={{ whiteSpace: 'nowrap' }}
          />
        </DataTable>
        <div
          className="flex justify-end text-base sm:text-xl
          font-bold py-7 xl:text-2xl border-b border-silver"
        >
          <p className="text-silver">TOTAL</p>
          <span className="text-blue ml-3">
            {calculateTotalSum().toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
        <div className="w-full">
          <DivTitle title="INFORMAÇÕES DO FORNECEDOR" />
          <SupplierInfo supplier={supplier} address={address} />
          <DivTitle title="CERTIFICADOS" />
          <DownloadCertificateSchool files={certificates} />
        </div>
      </div>
    </div>
  );
}

export default SuppliersOffer;
