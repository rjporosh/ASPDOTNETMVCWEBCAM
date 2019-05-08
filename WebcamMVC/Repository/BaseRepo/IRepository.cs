using System.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebcamMVC.Repository.BaseRepo
{
    public interface IRepository<T> where T : class
    {
        // CRUD

        int Add(T entity);
        IQueryable<T> ReadAll();
        int Update(T entity);
        int Delete(T entity);



    }
}