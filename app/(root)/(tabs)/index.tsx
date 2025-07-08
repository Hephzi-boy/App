// HomeScreen.tsx
import Images from '@/constants/Images';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export default function HomeScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAddProduct = () => {
    if (!name || !price || !image) {
      alert('Please fill all fields and upload an image.');
      return;
    }

    if (products.length >= 5) {
      alert('You have reached the product limit (5).');
      return;
    }

    const newProduct: Product = {
      id: uuid.v4().toString(),
      name,
      price: parseFloat(price),
      image,
    };

    setProducts([...products, newProduct]);

    // Reset form
    setName('');
    setPrice('');
    setImage(null);

    // After successful upload
    Toast.show({
      type: 'custom',
      text1: 'Product Uploaded!',
      text2: 'You have successfully uploaded a product.',
      props: { icon: Images.done },
    });
    Toast.show({
      type: 'custom',
      text1: 'Upload Limit Reached',
      text2: 'You have uploaded the maximum number of products',
      props: { icon: Images.done },
    });

    Toast.show({
      type: 'custom',
      text1: 'Cannot Upload',
      text2: 'You cannot upload any more products.',
      props: { icon: Images.cancel },
    });

  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Product Uploader</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No products added yet.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.price}>₦{item.price}</Text>
            </View>
          </View>
        )}
        style={styles.list}
      />

      {products.length < 5 && (
        <>
          <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
            {image ? (
              <Image source={{ uri: image }} style={styles.imagePreview} />
            ) : (
              <Text style={styles.imagePickerText}>Pick an Image</Text>
            )}
          </TouchableOpacity>

          <TextInput
            placeholder="Product Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Price (₦)"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            style={styles.input}
          />

          <TouchableOpacity onPress={handleAddProduct} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Product</Text>
          </TouchableOpacity>
        </>
      )}

      {products.length >= 5 && (
        <Text style={styles.limitText}>You’ve reached the max (5) product limit.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  list: {
    marginBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: 'gray',
    marginVertical: 20,
  },
  card: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 12,
    borderRadius: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    color: 'gray',
  },
  imagePicker: {
    backgroundColor: '#e6e6e6',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  imagePickerText: {
    color: '#666',
  },
  imagePreview: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  limitText: {
    textAlign: 'center',
    color: 'red',
    fontWeight: '600',
    marginTop: 16,
  },
});
