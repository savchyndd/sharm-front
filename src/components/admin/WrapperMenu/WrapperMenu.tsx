"use client";
import React, {FC, useState} from 'react';
import "./WrapperMenu.scss"
import TreeList from "@/components/admin/TreeList/TreeList";
import MyModal from "@/components/UI/MyModal/MyModal";
import CreateUser from "@/components/admin/users/CreateUser/CreateUser";
import MyBtn from "@/components/UI/MyBtn/MyBtn";
import CreateMenu from "@/components/admin/CreateMenu/CreateMenu";
import MenuItem from "@/components/admin/MenuItem/MenuItem";
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'


interface WrapperCategoryProps {
    menu: any
}

const WrapperMenu: FC<WrapperCategoryProps> = ({menu}) => {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [selectedMenu, setSelectedMenu] = useState<any>(null)
    const handleMenuClick = (menu: any) => setSelectedMenu(menu);
    const openCreateCategoryHandler = () => setOpenModal(!openModal);

    const moveItem = (dragId: string, hoverId: string) => {
        console.log("dragId", dragId)
        console.log("hoverId", hoverId)
    };

    return (
        <div className="container-wrapper-menu">
            <MyBtn text={"create menu"} color={"primary"} click={openCreateCategoryHandler}/>
            {menu.length === 0 ? <h3>no menu</h3> : null}
            <div className="wrapper-menu">
                <div className="container-tree-list">
                    <DndProvider backend={HTML5Backend}>
                        {menu.map((menu: any) => (
                            <TreeList
                                key={menu.id}
                                data={menu}
                                onFolderClick={handleMenuClick}
                                onMoveItem={moveItem}
                            />
                        ))}
                    </DndProvider>
                </div>
                {selectedMenu ? <MenuItem menu={selectedMenu}/> : null}
            </div>
            <MyModal visible={openModal} setVisible={setOpenModal}>
                <CreateMenu parentId={menu[0].id} setVisible={setOpenModal}/>
            </MyModal>
        </div>
    );
}

export default WrapperMenu;