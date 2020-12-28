import Router from "next/router";
import fetch from "isomorphic-unfetch";
import {
  LATEST_PRODUCTS,
  MENU_CATEGORIES,
  PRODUCT_DETAILS,
  GLOBAL_ERROR,
  LATEST_LOADING,
  PRODUCT_QA,
  POST_QUESTION,
  PRODUCT_REVIEWS,
  POST_PRODUCT_REVIEWS,
  PRODUCT_DETAILS_START,
  PRODUCT_DETAILS_FINISH,
} from "../types";
import { setCookie, removeCookie, getCookie } from "../../utils/cookie";
import { ProductService } from "../services/productService";
import { WISHLIST_BASE_URL } from "../../utils/constants";
import { getChildCategories } from "../../utils/common";

const productCategories = () => {
  return async (dispatch) => {
    const productService = new ProductService();
    const response = await productService.productCategories();
    if (response.isSuccess) {
      let parentCategory = [];

      let parentCate = [];
      let {
        categories ,
      } = response.data;

      categories.map((cate) => {
        if (cate.parent === undefined) {
          parentCategory.push(cate);
        }
      });

      let allCates = getChildCategories(categories, parentCategory);

      allCates.map((newChild) => {
        let newallCates = getChildCategories(categories, newChild.childCate);
        let parentCateEle = { ...newChild, childCate: newallCates };
        parentCate.push(parentCateEle);
      });

      dispatch({ type: MENU_CATEGORIES, payload: parentCate });
    } else if (!response.isSuccess) {
      dispatch({
        type: GLOBAL_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};

const getLatestProducts = (ctx) => {
  return async (dispatch) => {
    dispatch({ type: LATEST_LOADING, payload: [] })
    const productService = new ProductService();
    const response = await productService.getLatestProducts(ctx);
    if (response.isSuccess) {
      dispatch({ type: LATEST_PRODUCTS, payload: response.data });
    } else if (!response.isSuccess) {
      dispatch({
        type: GLOBAL_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};

const getProductDetails = (slug, ctx) => {
  return async (dispatch) => {
    await dispatch({ type: PRODUCT_DETAILS_START });
    const productService = new ProductService();
    const response = await productService.getProductDetails(slug, ctx);
    await dispatch({ type: PRODUCT_DETAILS_FINISH });
    if (response.isSuccess) {
      dispatch({ type: PRODUCT_DETAILS, payload: response.data });
    } else if (!response.isSuccess) {
      dispatch({
        type: GLOBAL_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};

const getQandA = (query) => {
  return async (dispatch) => {
    const productService = new ProductService();
    const response = await productService.getQandA(query);
    if (response.isSuccess) {
      dispatch({ type: PRODUCT_QA, payload: response.data });
    } else if (!response.isSuccess) {
      dispatch({
        type: GLOBAL_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};

const postQuestion = (query, body) => {
  return async (dispatch) => {
    const productService = new ProductService();
    const response = await productService.postQuestion(query, body);
    if (response.isSuccess) {
      dispatch({ type: POST_QUESTION, payload: response.data });
    } else if (!response.isSuccess) {
      dispatch({
        type: GLOBAL_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};

const getProductReviews = (query) => {
  return async (dispatch) => {
    const productService = new ProductService();
    const response = await productService.getProductReviews(query);
    if (response.isSuccess) {
      dispatch({ type: PRODUCT_REVIEWS, payload: response.data });
    } else if (!response.isSuccess) {
      dispatch({
        type: GLOBAL_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};

const postReviews = (query, body) => {
  return async (dispatch) => {
    const productService = new ProductService();
    const response = await productService.postReviews(query, body);
    if (response.isSuccess) {
      dispatch({ type: POST_PRODUCT_REVIEWS, payload: response.data });
    } else if (!response.isSuccess) {
      dispatch({
        type: GLOBAL_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};

const getOrders = (ctx) => {
  return async (dispatch) => {
    const resp = await fetch(
      `${WISHLIST_BASE_URL}/carts?page=1`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": getCookie("token", ctx),
        },
      }
    );
    const data = await resp.json();

    dispatch({ type: "check", payload: data });

    return data;
  };
};

export default {
  getLatestProducts,
  productCategories,
  getProductDetails,
  getOrders,
  getQandA,
  postQuestion,
  getProductReviews,
  postReviews
};
