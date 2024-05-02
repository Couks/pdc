import { createStackNavigator } from "@react-navigation/stack";
import CategoryListScreen from "./CategoryListScreen";
import CategoryEditScreen from "./CategoryEditScreen";

const CategoryStack = createStackNavigator();

export default function CategoryStackNavigator() {
  return (
    <CategoryStack.Navigator screenOptions={{ headerShown: false }}>
      <CategoryStack.Screen
        name="CategoryList"
        component={CategoryListScreen}
        options={{ headerTitle: "Categorias" }}
      />
      <CategoryStack.Screen
        name="CategoryEdit"
        component={CategoryEditScreen}
        options={{ headerTitle: "Editar Categoria" }}
      />
    </CategoryStack.Navigator>
  );
}
