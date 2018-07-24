import React, { Component } from 'react';
import { FlatList,
         View,
         Text,
         Dimensions,
         StyleSheet,
         Image,
         TouchableOpacity } from 'react-native';

const numColumns = 1;
const defaultMargin = 5;

const size = (Dimensions.get('window').width/numColumns)-defaultMargin*2;
const styles = StyleSheet.create({
  itemContainer: {
    width: size,
    //height: size,
    flex: 1,
    flexDirection: 'column',
    margin: defaultMargin,
  },
  item: {
    flex: 1,
    margin: defaultMargin,
  },
  itemTitleBar: {
    flex: 1,
    margin: defaultMargin,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemLabel: {
    margin: defaultMargin,
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemPrice: {
    margin: defaultMargin,
    fontSize: 20,
  },
  imageStyle: {
    flex: 1,
    resizeMode: 'contain',
    width: size,
    height: size / 1.499,
  },
});

const data = [
    {
        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzg3NjA4MDk4ODIxNw==",
        title: "Ocean Blue Shirt",
        variants: {
            __typename: "ProductVariantConnection",
            edges: [
                {
                    __typename: "ProductVariantEdge",
                    node: {
                        __typename: "ProductVariant",
                        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC84Njk1Nzc4NzcxMDAx",
                        image: {
                            __typename: "Image",
                            src: "https://cdn.shopify.com/s/files/1/0087/5449/5545/products/young-man-in-bright-fashion_925x_f5a66c3c-8ae5-4719-bb71-4efa1cb3cd05.jpg?v=1526925847"
                        },
                        price: "57.00",
                        selectedOptions: [
                            {
                                __typename: "SelectedOption",
                                name: "Title",
                                value: "xs"
                            }
                        ],
                        title: "xs"
                    }
                },
                {
                    __typename: "ProductVariantEdge",
                    node: {
                        __typename: "ProductVariant",
                        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC84Njk1Nzc4ODAzNzY5",
                        image: {
                            __typename: "Image",
                            src: "https://cdn.shopify.com/s/files/1/0087/5449/5545/products/young-man-in-bright-fashion_925x_f5a66c3c-8ae5-4719-bb71-4efa1cb3cd05.jpg?v=1526925847"
                        },
                        price: "42.00",
                        selectedOptions: [
                            {
                                __typename: "SelectedOption",
                                name: "Title",
                                value: "small"
                            }
                        ],
                        title: "small"
                    }
                },
                {
                    __typename: "ProductVariantEdge",
                    node: {
                        __typename: "ProductVariant",
                        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC84Njk1Nzc4ODM2NTM3",
                        image: {
                            __typename: "Image",
                            src: "https://cdn.shopify.com/s/files/1/0087/5449/5545/products/young-man-in-bright-fashion_925x_f5a66c3c-8ae5-4719-bb71-4efa1cb3cd05.jpg?v=1526925847"
                        },
                        price: "80.00",
                        selectedOptions: [
                            {
                                __typename: "SelectedOption",
                                name: "Title",
                                value: "medium"
                            }
                        ],
                        title: "medium"
                    }
                },
                {
                    __typename: "ProductVariantEdge",
                    node: {
                        __typename: "ProductVariant",
                        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC84Njk1Nzc4ODY5MzA1",
                        image: {
                            __typename: "Image",
                            src: "https://cdn.shopify.com/s/files/1/0087/5449/5545/products/young-man-in-bright-fashion_925x_f5a66c3c-8ae5-4719-bb71-4efa1cb3cd05.jpg?v=1526925847"
                        },
                        price: "53.00",
                        selectedOptions: [
                            {
                                __typename: "SelectedOption",
                                name: "Title",
                                value: "large"
                            }
                        ],
                        title: "large"
                    }
                },
                {
                    __typename: "ProductVariantEdge",
                    node: {
                        __typename: "ProductVariant",
                        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC84Njk1Nzc4OTAyMDcz",
                        image: {
                            __typename: "Image",
                            src: "https://cdn.shopify.com/s/files/1/0087/5449/5545/products/young-man-in-bright-fashion_925x_f5a66c3c-8ae5-4719-bb71-4efa1cb3cd05.jpg?v=1526925847"
                        },
                        price: "71.00",
                        selectedOptions: [
                            {
                                __typename: "SelectedOption",
                                name: "Title",
                                value: "xl"
                            }
                        ],
                        title: "xl"
                    }
                },
                {
                    __typename: "ProductVariantEdge",
                    node: {
                        __typename: "ProductVariant",
                        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC84Njk1Nzc4OTM0ODQx",
                        image: {
                            __typename: "Image",
                            src: "https://cdn.shopify.com/s/files/1/0087/5449/5545/products/young-man-in-bright-fashion_925x_f5a66c3c-8ae5-4719-bb71-4efa1cb3cd05.jpg?v=1526925847"
                        },
                        price: "50.00",
                        selectedOptions: [
                            {
                                __typename: "SelectedOption",
                                name: "Title",
                                value: "xxl"
                            }
                        ],
                        title: "xxl"
                    }
                }
            ],
            pageInfo: {
                __typename: "PageInfo",
                hasNextPage: false,
                hasPreviousPage: false
            }
        }
    },
    {
        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzg3NjA4MTA4NjUyMQ==",
        title: "Striped Silk Blouse",
        variants: {
            __typename: "ProductVariantConnection",
            edges: [
                {
                    __typename: "ProductVariantEdge",
                    node: {
                        __typename: "ProductVariant",
                        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC84Njk1Nzc5Mjk1Mjg5",
                        image: {
                            __typename: "Image",
                            src: "https://cdn.shopify.com/s/files/1/0087/5449/5545/products/striped-blouse-fashion_925x_2f026a74-211a-47aa-860a-41da333c9c66.jpg?v=1526925848"
                        },
                        price: "71.00",
                        selectedOptions: [
                            {
                                __typename: "SelectedOption",
                                name: "Title",
                                value: "xs"
                            }
                        ],
                        title: "xs"
                    }
                },
                {
                    __typename: "ProductVariantEdge",
                    node: {
                        __typename: "ProductVariant",
                        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC84Njk1Nzc5MzI4MDU3",
                        image: {
                            __typename: "Image",
                            src: "https://cdn.shopify.com/s/files/1/0087/5449/5545/products/striped-blouse-fashion_925x_2f026a74-211a-47aa-860a-41da333c9c66.jpg?v=1526925848"
                        },
                        price: "37.00",
                        selectedOptions: [
                            {
                                __typename: "SelectedOption",
                                name: "Title",
                                value: "small"
                            }
                        ],
                        title: "small"
                    }
                },
                {
                    __typename: "ProductVariantEdge",
                    node: {
                        __typename: "ProductVariant",
                        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC84Njk1Nzc5MzYwODI1",
                        image: {
                            __typename: "Image",
                            src: "https://cdn.shopify.com/s/files/1/0087/5449/5545/products/striped-blouse-fashion_925x_2f026a74-211a-47aa-860a-41da333c9c66.jpg?v=1526925848"
                        },
                        price: "52.00",
                        selectedOptions: [
                            {
                                __typename: "SelectedOption",
                                name: "Title",
                                value: "medium"
                            }
                        ],
                        title: "medium"
                    }
                },
                {
                    __typename: "ProductVariantEdge",
                    node: {
                        __typename: "ProductVariant",
                        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC84Njk1Nzc5MzkzNTkz",
                        image: {
                            __typename: "Image",
                            src: "https://cdn.shopify.com/s/files/1/0087/5449/5545/products/striped-blouse-fashion_925x_2f026a74-211a-47aa-860a-41da333c9c66.jpg?v=1526925848"
                        },
                        price: "63.00",
                        selectedOptions: [
                            {
                                __typename: "SelectedOption",
                                name: "Title",
                                value: "large"
                            }
                        ],
                        title: "large"
                    }
                },
                {
                    __typename: "ProductVariantEdge",
                    node: {
                        __typename: "ProductVariant",
                        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC84Njk1Nzc5NDU5MTI5",
                        image: {
                            __typename: "Image",
                            src: "https://cdn.shopify.com/s/files/1/0087/5449/5545/products/striped-blouse-fashion_925x_2f026a74-211a-47aa-860a-41da333c9c66.jpg?v=1526925848"
                        },
                        price: "33.00",
                        selectedOptions: [
                            {
                                __typename: "SelectedOption",
                                name: "Title",
                                value: "xl"
                            }
                        ],
                        title: "xl"
                    }
                },
                {
                    __typename: "ProductVariantEdge",
                    node: {
                        __typename: "ProductVariant",
                        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC84Njk1Nzc5NTU3NDMz",
                        image: {
                            __typename: "Image",
                            src: "https://cdn.shopify.com/s/files/1/0087/5449/5545/products/striped-blouse-fashion_925x_2f026a74-211a-47aa-860a-41da333c9c66.jpg?v=1526925848"
                        },
                        price: "51.00",
                        selectedOptions: [
                            {
                                __typename: "SelectedOption",
                                name: "Title",
                                value: "xxl"
                            }
                        ],
                        title: "xxl"
                    }
                }
            ],
            pageInfo: {
                __typename: "PageInfo",
                hasNextPage: false,
                hasPreviousPage: false
            }
        }
    },
    {
        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzg3NjA4MTY3NjM0NQ==",
        title: "Dark Denim Top",
        variants: {
            __typename: "ProductVariantConnection",
            edges: [
                {
                    __typename: "ProductVariantEdge",
                    node: {
                        __typename: "ProductVariant",
                        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC84Njk1NzgyNzAzMTYx",
                        image: {
                            __typename: "Image",
                            src: "https://cdn.shopify.com/s/files/1/0087/5449/5545/products/young-female-models-denim_925x_e52e73bc-69a9-43d4-abfd-7b73b9311e71.jpg?v=1526925849"
                        },
                        price: "71.00",
                        selectedOptions: [
                            {
                                __typename: "SelectedOption",
                                name: "Title",
                                value: "xs"
                            }
                        ],
                        title: "xs"
                    }
                },
                {
                    __typename: "ProductVariantEdge",
                    node: {
                        __typename: "ProductVariant",
                        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC84Njk1NzgyODAxNDY1",
                        image: {
                            __typename: "Image",
                            src: "https://cdn.shopify.com/s/files/1/0087/5449/5545/products/young-female-models-denim_925x_e52e73bc-69a9-43d4-abfd-7b73b9311e71.jpg?v=1526925849"
                        },
                        price: "45.00",
                        selectedOptions: [
                            {
                                __typename: "SelectedOption",
                                name: "Title",
                                value: "small"
                            }
                        ],
                        title: "small"
                    }
                },
                {
                    __typename: "ProductVariantEdge",
                    node: {
                        __typename: "ProductVariant",
                        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC84Njk1NzgyODY3MDAx",
                        image: {
                            __typename: "Image",
                            src: "https://cdn.shopify.com/s/files/1/0087/5449/5545/products/young-female-models-denim_925x_e52e73bc-69a9-43d4-abfd-7b73b9311e71.jpg?v=1526925849"
                        },
                        price: "72.00",
                        selectedOptions: [
                            {
                                __typename: "SelectedOption",
                                name: "Title",
                                value: "medium"
                            }
                        ],
                        title: "medium"
                    }
                },
                {
                    __typename: "ProductVariantEdge",
                    node: {
                        __typename: "ProductVariant",
                        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC84Njk1NzgyOTMyNTM3",
                        image: {
                            __typename: "Image",
                            src: "https://cdn.shopify.com/s/files/1/0087/5449/5545/products/young-female-models-denim_925x_e52e73bc-69a9-43d4-abfd-7b73b9311e71.jpg?v=1526925849"
                        },
                        price: "63.00",
                        selectedOptions: [
                            {
                                __typename: "SelectedOption",
                                name: "Title",
                                value: "large"
                            }
                        ],
                        title: "large"
                    }
                },
                {
                    __typename: "ProductVariantEdge",
                    node: {
                        __typename: "ProductVariant",
                        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC84Njk1NzgzMDMwODQx",
                        image: {
                            __typename: "Image",
                            src: "https://cdn.shopify.com/s/files/1/0087/5449/5545/products/young-female-models-denim_925x_e52e73bc-69a9-43d4-abfd-7b73b9311e71.jpg?v=1526925849"
                        },
                        price: "50.00",
                        selectedOptions: [
                            {
                                __typename: "SelectedOption",
                                name: "Title",
                                value: "xl"
                            }
                        ],
                        title: "xl"
                    }
                },
                {
                    __typename: "ProductVariantEdge",
                    node: {
                        __typename: "ProductVariant",
                        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC84Njk1NzgzMDYzNjA5",
                        image: {
                            __typename: "Image",
                            src: "https://cdn.shopify.com/s/files/1/0087/5449/5545/products/young-female-models-denim_925x_e52e73bc-69a9-43d4-abfd-7b73b9311e71.jpg?v=1526925849"
                        },
                        price: "49.00",
                        selectedOptions: [
                            {
                                __typename: "SelectedOption",
                                name: "Title",
                                value: "xxl"
                            }
                        ],
                        title: "xxl"
                    }
                }
            ],
            pageInfo: {
                __typename: "PageInfo",
                hasNextPage: false,
                hasPreviousPage: false
            }
        }
    },
    {
        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzg3NjA4MTc0MTg4MQ==",
        title: "Soft Winter Jacket",
        variants: {
            __typename: "ProductVariantConnection",
            edges: [
                {
                    __typename: "ProductVariantEdge",
                    node: {
                        __typename: "ProductVariant",
                        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC84Njk1NzgyNzM1OTI5",
                        image: {
                            __typename: "Image",
                            src: "https://cdn.shopify.com/s/files/1/0087/5449/5545/products/smiling-woman-on-snowy-afternoon_925x_43766d90-7665-4c37-9038-e61c1b70d2a7.jpg?v=1526925849"
                        },
                        price: "61.00",
                        selectedOptions: [
                            {
                                __typename: "SelectedOption",
                                name: "Title",
                                value: "xs"
                            }
                        ],
                        title: "xs"
                    }
                },
                {
                    __typename: "ProductVariantEdge",
                    node: {
                        __typename: "ProductVariant",
                        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC84Njk1NzgyNzY4Njk3",
                        image: {
                            __typename: "Image",
                            src: "https://cdn.shopify.com/s/files/1/0087/5449/5545/products/smiling-woman-on-snowy-afternoon_925x_43766d90-7665-4c37-9038-e61c1b70d2a7.jpg?v=1526925849"
                        },
                        price: "64.00",
                        selectedOptions: [
                            {
                                __typename: "SelectedOption",
                                name: "Title",
                                value: "small"
                            }
                        ],
                        title: "small"
                    }
                },
                {
                    __typename: "ProductVariantEdge",
                    node: {
                        __typename: "ProductVariant",
                        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC84Njk1NzgyODM0MjMz",
                        image: {
                            __typename: "Image",
                            src: "https://cdn.shopify.com/s/files/1/0087/5449/5545/products/smiling-woman-on-snowy-afternoon_925x_43766d90-7665-4c37-9038-e61c1b70d2a7.jpg?v=1526925849"
                        },
                        price: "42.00",
                        selectedOptions: [
                            {
                                __typename: "SelectedOption",
                                name: "Title",
                                value: "medium"
                            }
                        ],
                        title: "medium"
                    }
                },
                {
                    __typename: "ProductVariantEdge",
                    node: {
                        __typename: "ProductVariant",
                        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC84Njk1NzgyODk5NzY5",
                        image: {
                            __typename: "Image",
                            src: "https://cdn.shopify.com/s/files/1/0087/5449/5545/products/smiling-woman-on-snowy-afternoon_925x_43766d90-7665-4c37-9038-e61c1b70d2a7.jpg?v=1526925849"
                        },
                        price: "69.00",
                        selectedOptions: [
                            {
                                __typename: "SelectedOption",
                                name: "Title",
                                value: "large"
                            }
                        ],
                        title: "large"
                    }
                },
                {
                    __typename: "ProductVariantEdge",
                    node: {
                        __typename: "ProductVariant",
                        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC84Njk1NzgyOTY1MzA1",
                        image: {
                            __typename: "Image",
                            src: "https://cdn.shopify.com/s/files/1/0087/5449/5545/products/smiling-woman-on-snowy-afternoon_925x_43766d90-7665-4c37-9038-e61c1b70d2a7.jpg?v=1526925849"
                        },
                        price: "51.00",
                        selectedOptions: [
                            {
                                __typename: "SelectedOption",
                                name: "Title",
                                value: "xl"
                            }
                        ],
                        title: "xl"
                    }
                },
                {
                    __typename: "ProductVariantEdge",
                    node: {
                        __typename: "ProductVariant",
                        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC84Njk1NzgyOTk4MDcz",
                        image: {
                            __typename: "Image",
                            src: "https://cdn.shopify.com/s/files/1/0087/5449/5545/products/smiling-woman-on-snowy-afternoon_925x_43766d90-7665-4c37-9038-e61c1b70d2a7.jpg?v=1526925849"
                        },
                        price: "75.00",
                        selectedOptions: [
                            {
                                __typename: "SelectedOption",
                                name: "Title",
                                value: "xxl"
                            }
                        ],
                        title: "xxl"
                    }
                }
            ],
            pageInfo: {
                __typename: "PageInfo",
                hasNextPage: false,
                hasPreviousPage: false
            }
        }
    },
    {
        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzg3NjA4MjA2OTU2MQ==",
        title: "Olive Green Jacket",
        variants: {
            __typename: "ProductVariantConnection",
            edges: [
                {
                    __typename: "ProductVariantEdge",
                    node: {
                        __typename: "ProductVariant",
                        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC84Njk1NzgzODUwMDQx",
                        image: {
                            __typename: "Image",
                            src: "https://cdn.shopify.com/s/files/1/0087/5449/5545/products/urban-fashion_925x_39f056e7-541e-44b8-92d6-9fcdca9a1f95.jpg?v=1526925851"
                        },
                        price: "60.00",
                        selectedOptions: [
                            {
                                __typename: "SelectedOption",
                                name: "Title",
                                value: "xs"
                            }
                        ],
                        title: "xs"
                    }
                },
                {
                    __typename: "ProductVariantEdge",
                    node: {
                        __typename: "ProductVariant",
                        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC84Njk1NzgzODgyODA5",
                        image: {
                            __typename: "Image",
                            src: "https://cdn.shopify.com/s/files/1/0087/5449/5545/products/urban-fashion_925x_39f056e7-541e-44b8-92d6-9fcdca9a1f95.jpg?v=1526925851"
                        },
                        price: "57.00",
                        selectedOptions: [
                            {
                                __typename: "SelectedOption",
                                name: "Title",
                                value: "small"
                            }
                        ],
                        title: "small"
                    }
                },
                {
                    __typename: "ProductVariantEdge",
                    node: {
                        __typename: "ProductVariant",
                        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC84Njk1NzgzOTE1NTc3",
                        image: {
                            __typename: "Image",
                            src: "https://cdn.shopify.com/s/files/1/0087/5449/5545/products/urban-fashion_925x_39f056e7-541e-44b8-92d6-9fcdca9a1f95.jpg?v=1526925851"
                        },
                        price: "67.00",
                        selectedOptions: [
                            {
                                __typename: "SelectedOption",
                                name: "Title",
                                value: "medium"
                            }
                        ],
                        title: "medium"
                    }
                },
                {
                    __typename: "ProductVariantEdge",
                    node: {
                        __typename: "ProductVariant",
                        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC84Njk1NzgzOTQ4MzQ1",
                        image: {
                            __typename: "Image",
                            src: "https://cdn.shopify.com/s/files/1/0087/5449/5545/products/urban-fashion_925x_39f056e7-541e-44b8-92d6-9fcdca9a1f95.jpg?v=1526925851"
                        },
                        price: "30.00",
                        selectedOptions: [
                            {
                                __typename: "SelectedOption",
                                name: "Title",
                                value: "large"
                            }
                        ],
                        title: "large"
                    }
                },
                {
                    __typename: "ProductVariantEdge",
                    node: {
                        __typename: "ProductVariant",
                        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC84Njk1NzgzOTgxMTEz",
                        image: {
                            __typename: "Image",
                            src: "https://cdn.shopify.com/s/files/1/0087/5449/5545/products/urban-fashion_925x_39f056e7-541e-44b8-92d6-9fcdca9a1f95.jpg?v=1526925851"
                        },
                        price: "43.00",
                        selectedOptions: [
                            {
                                __typename: "SelectedOption",
                                name: "Title",
                                value: "xl"
                            }
                        ],
                        title: "xl"
                    }
                },
                {
                    __typename: "ProductVariantEdge",
                    node: {
                        __typename: "ProductVariant",
                        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC84Njk1Nzg0MDQ2NjQ5",
                        image: {
                            __typename: "Image",
                            src: "https://cdn.shopify.com/s/files/1/0087/5449/5545/products/urban-fashion_925x_39f056e7-541e-44b8-92d6-9fcdca9a1f95.jpg?v=1526925851"
                        },
                        price: "46.00",
                        selectedOptions: [
                            {
                                __typename: "SelectedOption",
                                name: "Title",
                                value: "xxl"
                            }
                        ],
                        title: "xxl"
                    }
                }
            ],
            pageInfo: {
                __typename: "PageInfo",
                hasNextPage: false,
                hasPreviousPage: false
            }
        }
    },
    {
        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzg3NjA4MjcyNDkyMQ==",
        title: "Striped Skirt and Top",
        variants: {
            __typename: "ProductVariantConnection",
            edges: [
                {
                    __typename: "ProductVariantEdge",
                    node: {
                        __typename: "ProductVariant",
                        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC84Njk1Nzg1NzgzMzUz",
                        image: {
                            __typename: "Image",
                            src: "https://cdn.shopify.com/s/files/1/0087/5449/5545/products/woman-in-the-city_925x_8fc58784-b0dd-4534-98a9-090ed45d24bf.jpg?v=1526925854"
                        },
                        price: "74.00",
                        selectedOptions: [
                            {
                                __typename: "SelectedOption",
                                name: "Title",
                                value: "xs"
                            }
                        ],
                        title: "xs"
                    }
                },
                {
                    __typename: "ProductVariantEdge",
                    node: {
                        __typename: "ProductVariant",
                        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC84Njk1Nzg1ODQ4ODg5",
                        image: {
                            __typename: "Image",
                            src: "https://cdn.shopify.com/s/files/1/0087/5449/5545/products/woman-in-the-city_925x_8fc58784-b0dd-4534-98a9-090ed45d24bf.jpg?v=1526925854"
                        },
                        price: "43.00",
                        selectedOptions: [
                            {
                                __typename: "SelectedOption",
                                name: "Title",
                                value: "small"
                            }
                        ],
                        title: "small"
                    }
                },
                {
                    __typename: "ProductVariantEdge",
                    node: {
                        __typename: "ProductVariant",
                        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC84Njk1Nzg1OTE0NDI1",
                        image: {
                            __typename: "Image",
                            src: "https://cdn.shopify.com/s/files/1/0087/5449/5545/products/woman-in-the-city_925x_8fc58784-b0dd-4534-98a9-090ed45d24bf.jpg?v=1526925854"
                        },
                        price: "64.00",
                        selectedOptions: [
                            {
                                __typename: "SelectedOption",
                                name: "Title",
                                value: "medium"
                            }
                        ],
                        title: "medium"
                    }
                },
                {
                    __typename: "ProductVariantEdge",
                    node: {
                        __typename: "ProductVariant",
                        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC84Njk1Nzg1OTQ3MTkz",
                        image: {
                            __typename: "Image",
                            src: "https://cdn.shopify.com/s/files/1/0087/5449/5545/products/woman-in-the-city_925x_8fc58784-b0dd-4534-98a9-090ed45d24bf.jpg?v=1526925854"
                        },
                        price: "47.00",
                        selectedOptions: [
                            {
                                __typename: "SelectedOption",
                                name: "Title",
                                value: "large"
                            }
                        ],
                        title: "large"
                    }
                },
                {
                    __typename: "ProductVariantEdge",
                    node: {
                        __typename: "ProductVariant",
                        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC84Njk1Nzg1OTc5OTYx",
                        image: {
                            __typename: "Image",
                            src: "https://cdn.shopify.com/s/files/1/0087/5449/5545/products/woman-in-the-city_925x_8fc58784-b0dd-4534-98a9-090ed45d24bf.jpg?v=1526925854"
                        },
                        price: "48.00",
                        selectedOptions: [
                            {
                                __typename: "SelectedOption",
                                name: "Title",
                                value: "xl"
                            }
                        ],
                        title: "xl"
                    }
                },
                {
                    __typename: "ProductVariantEdge",
                    node: {
                        __typename: "ProductVariant",
                        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC84Njk1Nzg2MDEyNzI5",
                        image: {
                            __typename: "Image",
                            src: "https://cdn.shopify.com/s/files/1/0087/5449/5545/products/woman-in-the-city_925x_8fc58784-b0dd-4534-98a9-090ed45d24bf.jpg?v=1526925854"
                        },
                        price: "40.00",
                        selectedOptions: [
                            {
                                __typename: "SelectedOption",
                                name: "Title",
                                value: "xxl"
                            }
                        ],
                        title: "xxl"
                    }
                }
            ],
            pageInfo: {
                __typename: "PageInfo",
                hasNextPage: false,
                hasPreviousPage: false
            }
        }
    }
];

export default class ProductsGrid extends Component {

  onPressItem = (item) => {
    this.props.navigation.navigate('ProductDetailScreen');
  }

  renderItem = (item) => {
    return (
      <TouchableOpacity onPress={this.onPressItem}>
        <View style={styles.itemContainer}>
          <Image style={styles.imageStyle} source={{uri: `${item.item.variants.edges[0].node.image.src}`}}/>
          <View style={styles.itemTitleBar}>
            <Text style={styles.itemLabel}>{item.item.title}</Text>
            <Text style={styles.itemPrice}>${item.item.variants.edges[0].node.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <FlatList
        data={this.props.products}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
        numColumns={numColumns} />
    );
  }
}
