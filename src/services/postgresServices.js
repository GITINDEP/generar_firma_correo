
exports.renderView = (res,view, data={})=>{
    res.render(view,data)
}

exports.getAll = async (model,modelInclude ="",paramWhere={}) =>{
    try {
        let result = "";
        if(modelInclude != ""){
             result = await model.findAll({where:paramWhere,
                include:[{
                    model:modelInclude,                    
                    }]
             });
        }else{
             result = await model.findAll({where:paramWhere});
        }
        return result
    } catch (error) {
        return error;
    }
}

exports.getId = async (model,id) =>{
    try {
        const result = await model.findOne({where:{id}})
        return result
    } catch (error) {
        return error
    }
}

exports.add = async (model, data) => {
    try {
        const result = await model.create(data);
        return result;
    } catch (error) {
        return error;
    }
}

exports.isActive = async (model,data,param)=>{
    try {
        const result = await model.update(data,  {
    where: param,
  },);
        return result;
    } catch (error) {
        return error;
    }
}