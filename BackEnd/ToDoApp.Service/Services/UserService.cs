using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Model = ToDoApp.Models;
using DBModel = ToDoApp.Data.Models;
using ToDoApp.Service.Contracts;
using ToDoApp.Data.Contracts;
using Nelibur.ObjectMapper;
using ToDoApp.Models;
using ToDoApp.Service.Config;

namespace ToDoApp.Service.Services
{
    public class UserService : IUserService
    {
        private readonly IRepository<DBModel.User> _userRepository;

        public UserService(IRepository<DBModel.User> userRepository)
        {
            _userRepository = userRepository;
            TinyMapperConfig.Configure();
        }

        public async Task<Model.User> AddAsync(Model.User user)
        {
            var dbUser = TinyMapper.Map<DBModel.User>(user);
            var addedDbUser = await _userRepository.AddAsync(dbUser);
            return TinyMapper.Map<Model.User>(addedDbUser);
        }

        public async Task<List<Model.User>> GetAllAsync()
        {
            var tasks = await _userRepository.GetAllAsync();
            return TinyMapper.Map<List<Model.User>>(tasks);
        }

    }
}