import React, { useState, useEffect } from 'react';
import { useAuthUser } from 'react-auth-kit';
import { AutoComplete } from 'primereact/autocomplete';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { fetchFood } from '../../../api/foodRequests';
import SaveButton from '../../../components/Buttons/SaveButton';
import Table from './components/Table';
import { fetchAllModalities } from '../../../api/schoolRequests';
import { getGeneralListsByCycle } from '../../../api/foodListRequests';
import { sendRequest } from './handler';
import { useCycle } from '../../../contexts/CycleContextProvider';
import OverlayButton from './components/OverlayButton';
import Tips from './components/Tips';
import { useToast } from '../../../contexts/ToastContextProvider';
import FormLabel from '../../../components/FormFields/FormLabel';

function GeneralList() {
  const authUser = useAuthUser();
  const userToken = authUser().token;
  const { cycle } = useCycle();
  const [products, setProducts] = useState([]);
  const [storedList, setStoredList] = useState([]);
  const [baseProducts, setBaseProducts] = useState([]);
  const [fetchedModalities, setFetchedModalities] = useState([]);
  const [modalities, setModalities] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [disableSave, setDisableSave] = useState(false);
  const [selectedList, setSelectedList] = useState([]);
  const [activeMod, setActiveMod] = useState({ index: 0, id: 0 });
  const [selectedItem, setSelectedItem] = useState('');
  const cycleId = localStorage.getItem('cycle');
  const { showToast } = useToast();
  const active = (cycle && cycle.list === 'OPEN');
  const [inactiveMessage, setInactiveMessage] = useState();
  const [viewTips, setViewTips] = useState(false);

  useEffect(() => {
    if (cycle) {
      if (cycle.list === 'PENDING') {
        setInactiveMessage('Aberto para pautas em breve');
      } else if (cycle.list === 'FINISHED') {
        setInactiveMessage('O período para alteração de pautas foi encerrado.');
      }
    }
  }, [cycle]);

  const parseList = (list) => {
    const newList = list.map((item) => ({ ...item, fullname: `${item.name}, ${item.description}` }));
    return newList;
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchFood(userToken);
        const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
        const newList = parseList(sortedData);
        setProducts(newList);
        setBaseProducts(newList);
        setFiltered(newList);
      } catch (error) {
        showToast('error', 'ERRO', 'Não foi possível obter a lista de alimentos');
      }
    };
    const getModalities = async () => {
      try {
        const data = await fetchAllModalities(userToken);
        const newList = data.map((item) => ({
          ...item, label: item.name, list: [],
        }));
        setActiveMod({ index: 0, id: newList[0].id });
        setFetchedModalities(newList);
      } catch (error) {
        showToast('error', 'ERRO', 'Não foi possível obter a lista de modalidades');
      }
    };

    const getLists = async () => {
      try {
        const res = await getGeneralListsByCycle(cycleId, userToken);
        if (res.length > 0) {
          setStoredList(res);
        }
      } catch (error) {
        showToast('error', 'ERRO', 'Não foi possível obter a lista de pautas');
      }
    };

    getModalities();
    getProducts();
    getLists();
  }, []);

  useEffect(() => {
    if (storedList.length > 0 && fetchedModalities.length > 0) {
      let newModalities = fetchedModalities.map((item) => {
        const list = storedList.find((listItem) => listItem.modality_id === item.id);
        if (list) {
          return {
            ...item,
            mode: 'update',
            list_id: list.id,
            list: list.general_list_food,
            fetchedList: list.general_list_food || [],
          };
        }

        return {
          ...item,
          mode: 'create',
          list_id: null,
          list: [],
          fetchedList: [],
        };
      });

      newModalities = newModalities.map((item) => ({ ...item, list: parseList(item.list) }));
      const newFiltered = products.filter(
        (item) => !newModalities[activeMod.index].list.some((selected) => selected.id === item.id),
      );
      setProducts(newFiltered);
      setModalities(newModalities);
      setSelectedList(newModalities[activeMod.index].list);
    } else if (storedList.length === 0 && fetchedModalities.length > 0) {
      const newModalities = fetchedModalities.map((item) => ({
        ...item,
        list: [],
        mode: 'create',
        fetchedList: [],
      }));

      setModalities(newModalities);
    }
  }, [storedList, fetchedModalities]);

  const search = (event) => {
    setTimeout(() => {
      let filteredData;

      if (!event.query.trim().length) {
        filteredData = [...products];
      } else {
        filteredData = products.filter(
          (item) => item.name.toLowerCase().startsWith(event.query.toLowerCase()),
        );
      }

      setFiltered(filteredData);
    }, 100);
  };

  const navigateModality = (direction) => {
    let i = 0;
    if (direction === 'forward') i = 1;
    else if (direction === 'back') i = -1;

    if (activeMod.index + i >= 0 && activeMod.index + i < modalities.length) {
      modalities[activeMod.index].list = selectedList;
      const newSelectedList = modalities[activeMod.index + i].list;
      const updatedBaseProducts = baseProducts.filter(
        (item) => !newSelectedList.some((selected) => selected.id === item.id),
      );
      setProducts(updatedBaseProducts);
      setActiveMod({ index: activeMod.index + i, id: modalities[activeMod.index + i].id });
      setSelectedList(newSelectedList);
    }
  };

  const handleTabChange = (e) => {
    modalities[activeMod.index].list = selectedList;
    const j = modalities.findIndex((item) => item.id === e.value.id);
    const newSelectedList = modalities[j].list;
    const updatedBaseProducts = baseProducts.filter(
      (item) => !newSelectedList.some((selected) => selected.id === item.id),
    );
    setProducts(updatedBaseProducts);
    setActiveMod({ index: j, id: e.value.id });
    setSelectedList(newSelectedList);
  };

  const handleSelect = (e) => {
    const newFiltered = products.filter((item) => item.id !== e.value.id);
    setProducts(newFiltered);
    setSelectedList([...selectedList, e.value]);
    setSelectedItem('');
  };

  const handleRemove = (rowData) => {
    const updateProducts = [...products, rowData];
    setProducts(updateProducts);
    setSelectedList(selectedList.filter((item) => item.id !== rowData.id));
  };

  const handleSaveClick = async () => {
    setDisableSave(true);
    modalities[activeMod.index].list = selectedList;
    try {
      await sendRequest({
        cycleId,
        modalities,
        userToken,
        storedList,
      });
      showToast('success', 'Pronto!', 'Pauta salva com sucesso');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      showToast('error', 'ERRO', error.message);
    }
  };

  return (
    <div className="flex flex-col relative items-center pt-12 w-full">
      {active && (
        <>
          <OverlayButton setVisible={setViewTips} />
          <Tips data={modalities} setVisible={setViewTips} visible={viewTips} />
        </>
      )}
      <div className="flex flex-col w-10/12 gap-6">
        <div className="flex w-full justify-between">
          <h1 className="text-blue text-2xl font-black">
            PAUTAS DE COMPRA
          </h1>
          <div className="flex items-center gap-6">
            {!active && (
            <p className="text-blue text-lg">
              {inactiveMessage}
            </p>
            )}
            <SaveButton
              onClick={handleSaveClick}
              isDisabled={!active || disableSave}
            />
          </div>
        </div>
        <div className="mt-2 w-full gap-2 flex flex-col">
          <FormLabel htmlFor="modality">
            MODALIDADES
          </FormLabel>
          <div className="flex gap-2 mb-2">
            <Dropdown
              value={modalities[activeMod.index]}
              options={modalities}
              onChange={handleTabChange}
              optionLabel="name"
              className="w-full"
              placeholder="Selecione uma modalidade"
            />
            <Button className="h-full" icon={<ArrowBack />} onClick={() => navigateModality('back')} />
            <Button className="h-full" icon={<ArrowForward />} onClick={() => navigateModality('forward')} />
          </div>
          <FormLabel htmlFor="modality">
            ALIMENTOS
          </FormLabel>
          <AutoComplete
            field="fullname"
            disabled={!active}
            forceSelection
            className="w-full"
            value={selectedItem}
            suggestions={filtered}
            placeholder="Busque itens para adicionar à pauta."
            completeMethod={search}
            onSelect={handleSelect}
            dropdown
            onChange={(e) => setSelectedItem(e.value)}
          />
          <div className=" w-full pt-2">
            <Table
              selectedList={selectedList}
              handleRemove={handleRemove}
              disabled={!active}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneralList;
