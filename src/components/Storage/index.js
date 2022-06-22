import AsyncStorage from "@react-native-async-storage/async-storage";

export const GuardarDado = async (array) => {
    try {
        await AsyncStorage.setItem('@app_ocorrecia', array)
    } catch (e) {
        // saving error
    }
    let value = await AsyncStorage.getItem('@app_ocorrecia')
    console.log(value);
}

export const RecuperarDado = async (valor) => {
    return await AsyncStorage.getItem('@app_ocorrecia');
}