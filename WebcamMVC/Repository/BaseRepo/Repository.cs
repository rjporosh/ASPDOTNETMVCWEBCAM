using WebcamMVC.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

using System.Threading;
using System.Web;
using System.Data;

namespace WebcamMVC.Repository.BaseRepo
{
    public class Repository<T> : IRepository<T>
       where T : class

    {
        public DBEntities db = new DBEntities();
        public int Add(T entity)
        {

            db.Set<T>().Add(entity);

            return db.SaveChanges();
        }

        

        public IQueryable<T> ReadAll()
        {
            return db.Set<T>().AsQueryable();
        }

       
    }
}