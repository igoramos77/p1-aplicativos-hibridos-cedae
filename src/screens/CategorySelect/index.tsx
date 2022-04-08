import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList } from 'react-native';

import Button from '../../Componets/Forms/Button';

import categories from "../../utils/situationsList";

import {
  Container,
  Header,
  Title,
  Category,
  Name,
  Separator,
  Footer,
} from './styles';
import axios from 'axios';
import { useAuth } from '../../hooks/auth';

interface Category {
  value: number | string;
  display: string;
}

interface Props {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

export function CategorySelect({category, setCategory, closeSelectCategory} : Props ){
  const { user } = useAuth();
  //const [categories, setCategories] = useState<Category>({} as Category);

  function handleCategorySelect(category: Category){
    setCategory(category);
  }

  return (
    <Container>
      <Header>
        <Title>Cidade</Title>
      </Header>

      <FlatList
        data={categories.sort((a,b) => {
          return a.value < b.value ? -1 : a.value > b.value ? 1 : 0; // ordem alfabetica
        })}
        style={{ flex: 1, width: '100%'}}
        keyExtractor={(item: Category) => String(item.value)}
        renderItem={({ item }) => (
          <Category
            onPress={() => handleCategorySelect(item)}
            isActive={category.value === item.value}
          >
            <Name>{item.display}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <Button
          background="primary"
          title="Selecionar cidade"
          onPress={closeSelectCategory}
        />
      </Footer>
    </Container>
  )
}