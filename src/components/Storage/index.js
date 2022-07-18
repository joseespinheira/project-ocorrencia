import AsyncStorage from "@react-native-async-storage/async-storage";

export const GuardarDado = async (chave,valor) => {
    try {
        await AsyncStorage.setItem(chave, valor)
    } catch (e) {
        // saving error
    }
}

export const RecuperarDado = async (chave) => {
    return await AsyncStorage.getItem(chave);
}