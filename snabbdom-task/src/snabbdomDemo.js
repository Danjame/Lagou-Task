import { init, h } from 'snabbdom'
import style from 'snabbdom/modules/style'
import eventlisteners from 'snabbdom/modules/eventlisteners'

const patch = init([
    style,
    eventlisteners
])

let app = document.querySelector('#app')

let data = [
        {rank: 1, title: 'Shanghai University', desc: 'from Shanghai, China'},
        {rank: 2, title: 'Beijing University', desc: 'from Shanghai, China'},
        {rank: 3, title: 'Qinghua University', desc: 'from Shanghai, China'},
        {rank: 4, title: 'Zhongshan University', desc: 'from Shanghai, China'},
        {rank: 5, title: 'Transportation University', desc: 'from Shanghai, China'},
    ]

function view(){
    return h ('div', [
        h('div', 'top 10 universities'),
        h('div', [
            h('span','Sort by'),
            h('button', {on: {click: sortByRank}}, 'Rank'),
            h('button', {on: {click: sortByTitle}}, 'Title'),
            h('button', {on: {click: sortByDesc}}, 'Discription')
        ]),
        h('div', listView(data))
    ])
}

function sortByRank (){
    console.log('Tank');
    data = data.sort((a, b)=>{
        return b.rank - a.rank
    })
    oldVnode = patch(oldVnode, view())
}

function sortByTitle(){
    console.log('Title')
}

function sortByDesc(){
    console.log('Discription');
}

function listView(data){
    return h('ul', data.map(item=>{
        return h('li.university', [
            h('span', item.rank),
            h('span', item.title),
            h('span', item.desc),
        ])
    }))
}

let oldVnode = patch(app, view())