import Balance from "@/components/dinamic-components/Balance";
import Header from "@/components/Header";
import Category from "@/components/Category";
import { View } from "react-native";

export default function CategoryListScreen() {
  return (
    <View className="flex-1 bg-green-500 dark:bg-green-700">
      <Header title="Categorias"></Header>
      <View className="flex-1 flex-wrap p-6 gap-6 items-center justify-center bg-white dark:bg-purple-800 rounded-t-[50px]">
        <Category
          iconName="home"
          title="Moradia"
          description="Todos os custos relacionados à sua casa, como aluguel ou pagamento da hipoteca, contas de água, luz e gás, e manutenção da residência."
        />
        <Category
          iconName="fast-food"
          title="Alimentação"
          description="Gastos com comida e bebida, incluindo compras de supermercado e refeições fora de casa."
        />
        <Category
          iconName="bus"
          title="Transporte"
          description="Despesas relacionadas a se locomover, como combustível, transporte público e manutenção do veículo."
        />
        <Category
          iconName="medical"
          title="Saúde"
          description="Custos com cuidados médicos, incluindo consultas, medicamentos e seguro de saúde."
        />
        <Category
          iconName="school"
          title="Estudos"
          description="Gastos ligados à aprendizagem, como mensalidades escolares, materiais didáticos e cursos."
        />
        <Category
          iconName="beer"
          title="Lazer"
          description="Despesas para se divertir e relaxar, como cinema, viagens e hobbies."
        />

        <Category
          iconName="shirt"
          title="Despesas Pessoais"
          description="Custos individuais, como roupas, produtos de higiene e cuidados pessoais."
        />

        <Category
          iconName="cash"
          title="Investimentos"
          description="Dinheiro reservado para poupança e investimento, visando metas financeiras de longo prazo."
        />

        <Category
          iconName="add"
          title="Outros Gastos"
          description="Esta categoria abrange todas as despesas como impostos, presentes, seguros diversos, doações, taxas bancárias e etc."
        />
      </View>
    </View>
  );
}
