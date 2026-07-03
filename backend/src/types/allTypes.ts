export type UUID = `${string}-${string}-${string}-${string}-${string}`;

export interface BlogEntry {
    readonly id:UUID
    readonly file_id:UUID
    title:string
    content:string
    created_at:Date 
    updated_at?:Date
}

export type ItemType = "file" | "folder"
export type HexColor = `#${string}`


export interface SideBarItem {
    readonly id:UUID
    name:string
    type: ItemType
    color: HexColor
    parent_id: UUID | null
    position: number
    is_open: boolean
    readonly created_at?:Date
    updated_at?:Date

}

export type InputSideBarItem = Pick<SideBarItem, 'name' | "type" | "color" | "is_open" | "position" | "parent_id"> 

export interface SideBarItemChanges {
    readonly id: UUID
    name?:string
    color?:HexColor
    is_open?:Boolean
}

export interface Task {
    readonly id:UUID
    title:string
    completed:boolean
    readonly created_at?:Date
    updated_at?:Date

} 

export interface User{
    readonly id:UUID
    username:string
    password:string

}

export type UserCredentials = Omit<User,'id'>
export type TokenPayload = Omit<User,'password'>