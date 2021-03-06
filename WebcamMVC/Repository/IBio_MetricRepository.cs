﻿using WebcamMVC.Models;
using WebcamMVC.Repository.BaseRepo;
using System;
using System.Collections.Generic;
using System.Linq;

using System.Threading;
using System.Web;

namespace WebcamMVC.Repository
{
    public interface IBio_MetricRepository : IRepository<tbl_Registration>
    {
    }

    public class Bio_MetricRepository : Repository<tbl_Registration>, IBio_MetricRepository
    {
        public IQueryable<tbl_Registration> Read()
        {
           
           
            return ReadAll();
        }
    }
}