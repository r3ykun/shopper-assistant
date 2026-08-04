import{create}from"zustand";
import type{
  ProductConfirmationDraft,
  ProductRecognitionPipelineResult,
}from"../services/productRecognition";

interface ProductRecognitionState{
  result:ProductRecognitionPipelineResult|null;
  draft:ProductConfirmationDraft|null;
  setRecognition:(
    result:ProductRecognitionPipelineResult,
    draft:ProductConfirmationDraft,
  )=>void;
  updateDraft:(changes:Partial<ProductConfirmationDraft>)=>void;
  clearRecognition:()=>void;
}

export const useProductRecognitionStore=create<ProductRecognitionState>(set=>({
  result:null,
  draft:null,
  setRecognition:(result,draft)=>set({result,draft}),
  updateDraft:changes=>set(state=>({
    draft:state.draft
      ?{...state.draft,...changes}
      :null,
  })),
  clearRecognition:()=>set({
    result:null,
    draft:null,
  }),
}));