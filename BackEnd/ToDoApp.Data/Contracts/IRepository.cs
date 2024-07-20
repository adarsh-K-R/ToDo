using System.Collections.Generic;
using System.Threading.Tasks;

namespace ToDoApp.Data.Contracts
{
    public interface IRepository<T> where T : class
    {
        Task<T> AddAsync(T entity);
        Task<List<T>> GetAllByIdAsync(string id);
        Task<List<T>> GetAllAsync();
        Task<T> UpdateAsync(string id, T entity);
        Task<bool> DeleteAsync(string id);
    }
}