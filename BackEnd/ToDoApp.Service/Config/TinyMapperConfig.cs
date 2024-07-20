using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nelibur.ObjectMapper; 
using DBModel = ToDoApp.Data.Models;
using Model = ToDoApp.Models;

namespace ToDoApp.Service.Config
{
    public static class TinyMapperConfig
    {
        public static void Configure()
        {
            TinyMapper.Bind<DBModel.User, Model.User>();
            TinyMapper.Bind<Model.User, DBModel.User>();

            TinyMapper.Bind<List<DBModel.User>, List<Model.User>>();

            TinyMapper.Bind<DBModel.Task, Model.Task>(config => {
                config.Ignore(x => x.User);
            });

            TinyMapper.Bind<Model.Task, DBModel.Task>();

            TinyMapper.Bind<List<DBModel.Task>, List<Model.Task>>();
        }
        
    }
}