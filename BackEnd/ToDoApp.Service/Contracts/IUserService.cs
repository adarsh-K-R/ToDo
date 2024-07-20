using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Model = ToDoApp.Models;
using DBModel = ToDoApp.Data.Models;

namespace ToDoApp.Service.Contracts
{
    public interface IUserService
    {
        public Task<Model.User> AddAsync(Model.User user);
        public Task<List<Model.User>> GetAllAsync();
    }
}