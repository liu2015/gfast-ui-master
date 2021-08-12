import request from '@/utils/request'

// 查询nolist列表
export function listNolist(query) {
    return request({
        url: '/module/nolist/list',
        method: 'get',
        params: query
    })
}

// 查询nolist详细
export function getNolist (id) {
    return request({
        url: '/module/nolist/edit?id='+id,
        method: 'get'
    })
}


// 新增nolist
export function addNolist(data) {
    return request({
        url: '/module/nolist/add',
        method: 'post',
        data: data
    })
}

// 修改nolist
export function updateNolist(data) {
    return request({
        url: '/module/nolist/edit',
        method: 'post',
        data: data
    })
}

// 删除nolist
export function delNolist(ids) {
    return request({
        url: '/module/nolist/delete',
        method: 'delete',
        data:{ids:ids}
    })
}

// Listdata 获取内容
export function listNolisttest(query) {
    return request({
        url: '/module/nolist/listdata',
        method: 'get',
        params: query
    })
}

