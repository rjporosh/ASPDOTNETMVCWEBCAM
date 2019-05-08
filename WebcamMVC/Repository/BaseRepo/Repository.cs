using WebcamMVC.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
//using System.Security.Claims;
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

        public int AddRange(List<T> entityList)
        {
            //db.Set<T>().AddRange(entityList);


            return db.SaveChanges();
        }

        public int Delete(T entity)
        {
            db.Set<T>().Remove(entity);

            return db.SaveChanges();
        }

        public IQueryable<T> ReadAll()
        {
            return db.Set<T>().AsQueryable();
        }

        public int Update(T entity)
        {
            db.Entry(entity).State = EntityState.Modified;






            return db.SaveChanges();
        }
    }
}