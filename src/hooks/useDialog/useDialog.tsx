import { create } from 'zustand'

type DialogProps = {
    title: string,
    message: string,
    onConfirm?: () => void,
    onCancel?: () => void,
}

type useDialogState = DialogProps & { 
    visible: boolean,  
    confirm: () => void,
    cancel: () => void,
    show: ( props: DialogProps ) => void,
}

export const useDialog = create<useDialogState>((set) => ({
    title: '',
    message: '',
    onConfirm: () => { return },
    onCancel: () => { return },
    confirm: () => set( state => { 
        state.onConfirm && state.onConfirm(); 
        return { ...state, visible: false };
    } ),
    cancel: () =>   set( state => {
        state.onCancel && state.onCancel();
        return { ...state, visible: false };
      }),
    visible: false,
    show: ( { title, message, onConfirm, onCancel }: DialogProps ) => {
        set( { title, message, onConfirm, onCancel, visible: true } ) 
    },
}));